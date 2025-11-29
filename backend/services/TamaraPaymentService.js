import axios from 'axios';
import PaymentSettings from '../models/PaymentSettings.js';

class TamaraPaymentService {
  constructor() {
    this.baseURL = 'https://api.tamara.co';
    this.apiKey = null;
    this.testMode = true;
    this.mockMode = process.env.NODE_ENV === 'development' && !process.env.TAMARA_API_URL;
  }

  async initialize() {
    try {
      const settings = await PaymentSettings.findOne({
        where: { provider: 'tamara' }
      });
      
      if (settings && settings.isEnabled) {
        this.apiKey = settings.apiKey;
        this.testMode = settings.testMode;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to initialize Tamara Payment:', error);
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
        throw new Error('Tamara Payment not configured');
      }

      if (this.mockMode) {
        return this.createMockPayment(paymentData);
      }

      const payload = {
        order_reference_id: paymentData.orderId,
        total_amount: {
          amount: paymentData.amount,
          currency: paymentData.currency || 'AED'
        },
        description: paymentData.description || 'Order Payment',
        country_code: 'AE',
        payment_type: 'PAY_BY_INSTALMENTS',
        instalments: 3,
        consumer: {
          first_name: paymentData.customerName?.split(' ')[0] || 'Customer',
          last_name: paymentData.customerName?.split(' ')[1] || 'Name',
          phone_number: paymentData.customerPhone,
          email: paymentData.customerEmail
        },
        billing_address: paymentData.billingAddress || {},
        shipping_address: paymentData.shippingAddress || {},
        merchant_url: {
          success: paymentData.returnUrl,
          failure: paymentData.cancelUrl,
          cancel: paymentData.cancelUrl,
          notification: `${process.env.BACKEND_URL}/api/payments/tamara/webhook`
        },
        items: paymentData.items || []
      };

      const response = await axios.post(
        `${this.baseURL}/checkout`,
        payload,
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        paymentId: response.data.order_id,
        paymentUrl: response.data.checkout_url,
        status: 'pending',
        data: response.data
      };
    } catch (error) {
      console.error('Tamara payment creation failed:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  createMockPayment(paymentData) {
    const paymentId = `tamara_mock_${Date.now()}`;
    const mockPaymentUrl = `${process.env.FRONTEND_URL}/mock-payment?id=${paymentId}&amount=${paymentData.amount}&order=${paymentData.orderId}&provider=tamara`;
    
    return {
      success: true,
      paymentId,
      paymentUrl: mockPaymentUrl,
      status: 'pending',
      data: {
        order_id: paymentId,
        checkout_url: mockPaymentUrl,
        status: 'pending'
      }
    };
  }

  async getPayment(paymentId) {
    try {
      if (!this.apiKey) {
        await this.initialize();
      }

      const response = await axios.get(
        `${this.baseURL}/orders/${paymentId}`,
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  async handleWebhook(payload) {
    try {
      const { order_id, order_status, order_reference_id } = payload;
      
      switch (order_status) {
        case 'approved':
          return await this.handlePaymentCompleted({ 
            id: order_id, 
            metadata: { order_id: order_reference_id } 
          });
        case 'declined':
        case 'expired':
          return await this.handlePaymentFailed({ 
            id: order_id, 
            metadata: { order_id: order_reference_id } 
          });
        default:
          return { success: true, message: 'Webhook received but not processed' };
      }
    } catch (error) {
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

      return { success: true, message: 'Payment completed successfully' };
    } catch (error) {
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
            paymentStatus: 'failed'
          });
        }
      }

      return { success: true, message: 'Payment failure processed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new TamaraPaymentService();