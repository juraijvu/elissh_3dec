import axios from 'axios';
import PaymentSettings from '../models/PaymentSettings.js';

class TabbyPaymentService {
  constructor() {
    this.baseURL = 'https://api.tabby.ai/api/v2';
    this.apiKey = null;
    this.testMode = true;
    this.mockMode = process.env.NODE_ENV === 'development' && !process.env.TABBY_API_URL;
  }

  async initialize() {
    try {
      const settings = await PaymentSettings.findOne({
        where: { provider: 'tabby' }
      });
      
      if (settings && settings.isEnabled) {
        this.apiKey = settings.apiKey;
        this.testMode = settings.testMode;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to initialize Tabby Payment:', error);
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
        throw new Error('Tabby Payment not configured');
      }

      if (this.mockMode) {
        return this.createMockPayment(paymentData);
      }

      const payload = {
        payment: {
          amount: paymentData.amount.toString(),
          currency: paymentData.currency || 'AED',
          description: paymentData.description || 'Order Payment',
          buyer: {
            phone: paymentData.customerPhone,
            email: paymentData.customerEmail,
            name: paymentData.customerName
          },
          shipping_address: paymentData.shippingAddress,
          order: {
            tax_amount: "0.00",
            shipping_amount: "0.00",
            discount_amount: "0.00",
            reference_id: paymentData.orderId
          },
          order_history: [],
          meta: {
            order_id: paymentData.orderId,
            customer_id: paymentData.customerId
          }
        },
        lang: "en",
        merchant_code: this.testMode ? "ae" : "ae",
        merchant_urls: {
          success: paymentData.returnUrl,
          cancel: paymentData.cancelUrl,
          failure: paymentData.cancelUrl
        }
      };

      const response = await axios.post(
        `${this.baseURL}/checkout`,
        payload,
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        paymentId: response.data.payment.id,
        paymentUrl: response.data.web_url,
        status: response.data.payment.status,
        data: response.data
      };
    } catch (error) {
      console.error('Tabby payment creation failed:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  createMockPayment(paymentData) {
    const paymentId = `tabby_mock_${Date.now()}`;
    const mockPaymentUrl = `${process.env.FRONTEND_URL}/mock-payment?id=${paymentId}&amount=${paymentData.amount}&order=${paymentData.orderId}&provider=tabby`;
    
    return {
      success: true,
      paymentId,
      paymentUrl: mockPaymentUrl,
      status: 'pending',
      data: {
        id: paymentId,
        web_url: mockPaymentUrl,
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
        `${this.baseURL}/payments/${paymentId}`,
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
      const { id, status, order } = payload;
      
      switch (status) {
        case 'AUTHORIZED':
          return await this.handlePaymentCompleted({ id, metadata: { order_id: order?.reference_id } });
        case 'REJECTED':
        case 'EXPIRED':
          return await this.handlePaymentFailed({ id, metadata: { order_id: order?.reference_id } });
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

export default new TabbyPaymentService();