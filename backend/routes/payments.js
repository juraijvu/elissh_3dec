import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import PaymentSettings from '../models/PaymentSettings.js';
import VaultPaymentService from '../services/VaultPaymentService.js';
import TabbyPaymentService from '../services/TabbyPaymentService.js';
import TamaraPaymentService from '../services/TamaraPaymentService.js';
import { Order } from '../models/index.js';

const router = express.Router();

// Get payment settings (admin only)
router.get('/settings', protect, authorize('admin'), async (req, res) => {
  try {
    const settings = await PaymentSettings.findAll({
      attributes: ['id', 'provider', 'isEnabled', 'testMode', 'settings', 'createdAt', 'updatedAt']
    });
    
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update payment settings (admin only)
router.put('/settings/:provider', protect, authorize('admin'), async (req, res) => {
  try {
    const { provider } = req.params;
    const { isEnabled, apiKey, secretKey, testMode, settings } = req.body;

    let paymentSettings = await PaymentSettings.findOne({ where: { provider } });
    
    if (!paymentSettings) {
      paymentSettings = await PaymentSettings.create({
        provider,
        isEnabled: isEnabled || false,
        apiKey,
        secretKey,
        testMode: testMode !== undefined ? testMode : true,
        settings: settings || {}
      });
    } else {
      const updateData = {
        isEnabled: isEnabled !== undefined ? isEnabled : paymentSettings.isEnabled,
        testMode: testMode !== undefined ? testMode : paymentSettings.testMode,
        settings: settings || paymentSettings.settings
      };
      
      // Only update API key if provided
      if (apiKey !== undefined) {
        updateData.apiKey = apiKey;
      }
      
      // Only update secret key if provided
      if (secretKey !== undefined) {
        updateData.secretKey = secretKey;
      }
      
      await paymentSettings.update(updateData);
    }

    // Re-initialize the payment service
    if (provider === 'vault') {
      await VaultPaymentService.initialize();
    } else if (provider === 'tabby') {
      await TabbyPaymentService.initialize();
    } else if (provider === 'tamara') {
      await TamaraPaymentService.initialize();
    }

    res.json({ 
      success: true, 
      message: `${provider} payment settings updated successfully`,
      settings: {
        id: paymentSettings.id,
        provider: paymentSettings.provider,
        isEnabled: paymentSettings.isEnabled,
        testMode: paymentSettings.testMode,
        settings: paymentSettings.settings
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create Vault payment
router.post('/vault/create', protect, async (req, res) => {
  try {
    const { orderId, amount, currency, description } = req.body;
    const user = req.user;

    // Verify order belongs to user
    const order = await Order.findOne({
      where: { 
        id: orderId, 
        userId: user.id 
      }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const paymentData = {
      orderId: order.id,
      customerId: user.id,
      amount: amount || order.totalAmount,
      currency: currency || 'AED',
      description: description || `Payment for Order #${order.id}`,
      customerEmail: user.email,
      customerName: `${user.firstName} ${user.lastName}`,
      customerPhone: user.phone,
      returnUrl: `${process.env.FRONTEND_URL}/order-success?orderId=${order.id}`,
      cancelUrl: `${process.env.FRONTEND_URL}/checkout?orderId=${order.id}`
    };

    const result = await VaultPaymentService.createPayment(paymentData);

    if (result.success) {
      // Update order with payment info
      await order.update({
        paymentMethod: 'vault',
        paymentId: result.paymentId,
        paymentStatus: 'pending'
      });

      res.json({
        success: true,
        paymentId: result.paymentId,
        paymentUrl: result.paymentUrl,
        message: 'Payment created successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error || 'Failed to create payment'
      });
    }
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Vault payment status
router.get('/vault/:paymentId', protect, async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const result = await VaultPaymentService.getPayment(paymentId);
    
    if (result.success) {
      res.json({
        success: true,
        payment: result.data
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error || 'Failed to get payment'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Vault webhook endpoint
router.post('/vault/webhook', async (req, res) => {
  try {
    console.log('Received Vault webhook:', req.body);
    
    // Verify webhook signature if needed
    const signature = req.headers['x-vault-signature'];
    if (signature) {
      const settings = await PaymentSettings.findOne({ where: { provider: 'vault' } });
      if (settings && settings.secretKey) {
        const isValid = VaultPaymentService.verifyWebhookSignature(
          JSON.stringify(req.body),
          signature,
          settings.secretKey
        );
        
        if (!isValid) {
          return res.status(401).json({ success: false, message: 'Invalid signature' });
        }
      }
    }

    const result = await VaultPaymentService.handleWebhook(req.body);
    
    if (result.success) {
      res.json({ success: true, message: result.message });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Refund Vault payment (admin only)
router.post('/vault/:paymentId/refund', protect, authorize('admin'), async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { amount } = req.body;
    
    const result = await VaultPaymentService.refundPayment(paymentId, amount);
    
    if (result.success) {
      res.json({
        success: true,
        refund: result.data,
        message: 'Refund processed successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error || 'Failed to process refund'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create Tabby payment
router.post('/tabby/create', protect, async (req, res) => {
  try {
    const { orderId, amount, currency, description } = req.body;
    const user = req.user;

    const order = await Order.findOne({
      where: { 
        id: orderId, 
        userId: user.id 
      }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const paymentData = {
      orderId: order.id,
      customerId: user.id,
      amount: amount || order.total,
      currency: currency || 'AED',
      description: description || `Payment for Order #${order.id}`,
      customerEmail: user.email,
      customerName: `${user.firstName} ${user.lastName}`,
      customerPhone: user.phone,
      returnUrl: `${process.env.FRONTEND_URL}/order-success?orderId=${order.id}`,
      cancelUrl: `${process.env.FRONTEND_URL}/checkout?orderId=${order.id}`
    };

    const result = await TabbyPaymentService.createPayment(paymentData);

    if (result.success) {
      await order.update({
        paymentMethod: 'tabby',
        paymentId: result.paymentId,
        paymentStatus: 'pending'
      });

      res.json({
        success: true,
        paymentId: result.paymentId,
        paymentUrl: result.paymentUrl,
        message: 'Tabby payment created successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error || 'Failed to create Tabby payment'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create Tamara payment
router.post('/tamara/create', protect, async (req, res) => {
  try {
    const { orderId, amount, currency, description } = req.body;
    const user = req.user;

    const order = await Order.findOne({
      where: { 
        id: orderId, 
        userId: user.id 
      }
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const paymentData = {
      orderId: order.id,
      customerId: user.id,
      amount: amount || order.total,
      currency: currency || 'AED',
      description: description || `Payment for Order #${order.id}`,
      customerEmail: user.email,
      customerName: `${user.firstName} ${user.lastName}`,
      customerPhone: user.phone,
      returnUrl: `${process.env.FRONTEND_URL}/order-success?orderId=${order.id}`,
      cancelUrl: `${process.env.FRONTEND_URL}/checkout?orderId=${order.id}`,
      items: order.items || []
    };

    const result = await TamaraPaymentService.createPayment(paymentData);

    if (result.success) {
      await order.update({
        paymentMethod: 'tamara',
        paymentId: result.paymentId,
        paymentStatus: 'pending'
      });

      res.json({
        success: true,
        paymentId: result.paymentId,
        paymentUrl: result.paymentUrl,
        message: 'Tamara payment created successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error || 'Failed to create Tamara payment'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Tabby webhook
router.post('/tabby/webhook', async (req, res) => {
  try {
    const result = await TabbyPaymentService.handleWebhook(req.body);
    
    if (result.success) {
      res.json({ success: true, message: result.message });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Tamara webhook
router.post('/tamara/webhook', async (req, res) => {
  try {
    const result = await TamaraPaymentService.handleWebhook(req.body);
    
    if (result.success) {
      res.json({ success: true, message: result.message });
    } else {
      res.status(400).json({ success: false, message: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Test Vault connection (admin only)
router.post('/vault/test', protect, authorize('admin'), async (req, res) => {
  try {
    const initialized = await VaultPaymentService.initialize();
    
    if (initialized) {
      // Try to create a test payment with minimal amount
      const testPayment = await VaultPaymentService.createPayment({
        amount: 1, // 1 AED
        currency: 'AED',
        description: 'Test payment - connection verification',
        customerEmail: 'test@example.com',
        customerName: 'Test User',
        orderId: 'test-' + Date.now(),
        customerId: 'test-user'
      });

      if (testPayment.success) {
        res.json({
          success: true,
          message: 'Vault Payment connection successful',
          testPaymentId: testPayment.paymentId
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Connection test failed: ' + testPayment.error
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Vault Payment not configured or disabled'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;