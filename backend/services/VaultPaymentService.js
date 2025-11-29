import axios from 'axios';
import PaymentSettings from '../models/PaymentSettings.js';

class VaultPaymentService {
  constructor() {
    this.baseURL = process.env.VAULT_API_URL || 'https://api.vaultspay.com/v1';
    this.apiKey = null;
    this.testMode = true;
    this.mockMode = process.env.NODE_ENV === 'development' && !process.env.VAULT_API_URL;
  }

  async initialize() {
    try {
      const settings = await PaymentSettings.findOne({
        where: { provider: 'vault' }
      });
      
      if (settings && settings.isEnabled) {
        this.apiKey = settings.apiKey;
        this.testMode = settings.testMode;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to initialize Vault Payment:', error);
      return false;
    }
  }

  getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async createPayment(paymentData) {
    try {
      if (!this.apiKey) {
        await this.initialize();
      }

      if (!this.apiKey) {
        throw new Error('Vault Payment not configured');
      }

      // Mock mode for development
      if (this.mockMode) {
        return this.createMockPayment(paymentData);
      }

      const payload = {
        amount: Math.round(paymentData.amount * 100), // Convert to cents
        currency: paymentData.currency || 'AED',
        description: paymentData.description || 'Order Payment',
        customer: {
          email: paymentData.customerEmail,
          name: paymentData.customerName,
          phone: paymentData.customerPhone
        },
        metadata: {
          order_id: paymentData.orderId,
          customer_id: paymentData.customerId
        },
        return_url: paymentData.returnUrl || `${process.env.FRONTEND_URL}/order-success`,
        cancel_url: paymentData.cancelUrl || `${process.env.FRONTEND_URL}/checkout`,
        webhook_url: paymentData.webhookUrl || `${process.env.BACKEND_URL}/api/payments/vault/webhook`
      };

      console.log('Creating Vault payment with payload:', payload);

      const response = await axios.post(
        `${this.baseURL}/payments`,
        payload,
        { headers: this.getHeaders() }
      );

      console.log('Vault payment response:', response.data);

      return {
        success: true,
        paymentId: response.data.id,
        paymentUrl: response.data.payment_url,
        status: response.data.status,
        data: response.data
      };
    } catch (error) {
      console.error('Vault payment creation failed:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  createMockPayment(paymentData) {
    const paymentId = `mock_payment_${Date.now()}`;
    const mockPaymentUrl = `${process.env.FRONTEND_URL}/mock-payment?id=${paymentId}&amount=${paymentData.amount}&order=${paymentData.orderId}`;
    
    console.log('Creating mock Vault payment:', {
      paymentId,
      amount: paymentData.amount,
      orderId: paymentData.orderId
    });

    return {
      success: true,
      paymentId,
      paymentUrl: mockPaymentUrl,
      status: 'pending',
      data: {
        id: paymentId,
        payment_url: mockPaymentUrl,
        status: 'pending',
        amount: Math.round(paymentData.amount * 100),
        currency: paymentData.currency || 'AED',
        metadata: {
          order_id: paymentData.orderId,
          customer_id: paymentData.customerId
        }
      }
    };
  }

  async getPayment(paymentId) {
    try {
      if (!this.apiKey) {
        await this.initialize();
      }

      const response = await axios.get(
        `${this.baseURL}/payments/${paymentId}`,
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get Vault payment:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  async refundPayment(paymentId, amount = null) {
    try {
      if (!this.apiKey) {
        await this.initialize();
      }

      const payload = {};
      if (amount) {
        payload.amount = Math.round(amount * 100); // Convert to cents
      }

      const response = await axios.post(
        `${this.baseURL}/payments/${paymentId}/refund`,
        payload,
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Vault refund failed:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  verifyWebhookSignature(payload, signature, secret) {
    try {
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
      
      return signature === expectedSignature;
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return false;
    }
  }

  async handleWebhook(payload) {
    try {
      const { type, data } = payload;
      
      console.log('Processing Vault webhook:', type, data);

      switch (type) {
        case 'payment.completed':
          return await this.handlePaymentCompleted(data);
        case 'payment.failed':
          return await this.handlePaymentFailed(data);
        case 'payment.cancelled':
          return await this.handlePaymentCancelled(data);
        case 'refund.completed':
          return await this.handleRefundCompleted(data);
        default:
          console.log('Unhandled webhook type:', type);
          return { success: true, message: 'Webhook received but not processed' };
      }
    } catch (error) {
      console.error('Webhook processing failed:', error);
      return { success: false, error: error.message };
    }
  }

  async handlePaymentCompleted(data) {
    try {
      const { Order } = await import('../models/index.js');
      
      const orderId = data.metadata?.order_id;
      if (!orderId) {
        throw new Error('Order ID not found in payment metadata');
      }

      const order = await Order.findByPk(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      await order.update({
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentId: data.id
      });

      console.log(`Order ${orderId} marked as paid via Vault Payment`);
      
      return { success: true, message: 'Payment completed successfully' };
    } catch (error) {
      console.error('Failed to handle payment completion:', error);
      return { success: false, error: error.message };
    }
  }

  async handlePaymentFailed(data) {
    try {
      const { Order } = await import('../models/index.js');
      
      const orderId = data.metadata?.order_id;
      if (orderId) {
        const order = await Order.findByPk(orderId);
        if (order) {
          await order.update({
            paymentStatus: 'failed',
            paymentData: data
          });
        }
      }

      return { success: true, message: 'Payment failure processed' };
    } catch (error) {
      console.error('Failed to handle payment failure:', error);
      return { success: false, error: error.message };
    }
  }

  async handlePaymentCancelled(data) {
    try {
      const { Order } = await import('../models/index.js');
      
      const orderId = data.metadata?.order_id;
      if (orderId) {
        const order = await Order.findByPk(orderId);
        if (order) {
          await order.update({
            paymentStatus: 'cancelled',
            paymentData: data
          });
        }
      }

      return { success: true, message: 'Payment cancellation processed' };
    } catch (error) {
      console.error('Failed to handle payment cancellation:', error);
      return { success: false, error: error.message };
    }
  }

  async handleRefundCompleted(data) {
    try {
      const { Order } = await import('../models/index.js');
      
      const orderId = data.metadata?.order_id;
      if (orderId) {
        const order = await Order.findByPk(orderId);
        if (order) {
          await order.update({
            paymentStatus: 'refunded',
            paymentData: { ...order.paymentData, refund: data }
          });
        }
      }

      return { success: true, message: 'Refund processed successfully' };
    } catch (error) {
      console.error('Failed to handle refund completion:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new VaultPaymentService();