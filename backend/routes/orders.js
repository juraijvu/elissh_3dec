import express from 'express';
import { Order, Product, Cart, User } from '../models/index.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Create order
router.post('/', protect, async (req, res) => {
  try {
    console.log('=== ORDER CREATION REQUEST ===');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);
    
    const { shippingAddress, billingAddress, paymentMethod, couponCode, items } = req.body;

    let orderItems = [];
    let subtotal = 0;

    // If items are provided in request, use them (for direct checkout)
    if (items && items.length > 0) {
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product not found: ${item.productId}` });
        }
        
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        orderItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          variant: item.variant || null
        });
      }
    } else {
      // Use cart items
      const cart = await Cart.findOne({ where: { userId: req.user.id } });
      if (!cart || !cart.items || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty and no items provided' });
      }

      for (const item of cart.items) {
        const product = await Product.findByPk(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product not found: ${item.productId}` });
        }
        
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        orderItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          variant: item.variant || null
        });
      }

      // Clear cart after successful order
      await cart.update({
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: 'No items to order' });
    }

    const shippingCost = subtotal >= 100 ? 0 : 15;
    const tax = subtotal * 0.05; // 5% VAT
    const total = subtotal + shippingCost + tax;

    // Generate order number
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `ELS${timestamp}${random}`;

    const order = await Order.create({
      orderNumber,
      userId: req.user.id,
      items: orderItems,
      shippingAddress: shippingAddress || {},
      billingAddress: billingAddress || shippingAddress || {},
      subtotal,
      shippingCost,
      tax,
      total,
      paymentMethod: paymentMethod || 'cod',
      couponCode: couponCode || null,
      status: 'pending',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      statusHistory: [{
        status: 'pending',
        note: 'Order created',
        timestamp: new Date()
      }]
    });

    console.log('Order created successfully:', order.orderNumber);
    console.log('Cart cleared for user:', req.user.id);
    
    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('=== ORDER CREATION ERROR ===');
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
});

// Get user orders
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (Admin only)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const statusHistory = order.statusHistory || [];
    statusHistory.push({
      status,
      note: note || `Order status updated to ${status}`,
      timestamp: new Date()
    });

    const updateData = {
      status,
      statusHistory
    };

    if (status === 'delivered') {
      updateData.deliveredAt = new Date();
    }

    await order.update(updateData);

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const status = req.query.status;

    const whereClause = status ? { status } : {};

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'User',
        attributes: ['id', 'name', 'email', 'firstName', 'lastName']
      }],
      order: [['createdAt', 'DESC']],
      offset,
      limit
    });

    res.json({
      success: true,
      orders,
      pagination: {
        page,
        pages: Math.ceil(count / limit),
        total: count,
        limit
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update payment status for mock payments
router.put('/:id/payment-success', protect, async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await order.update({
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: paymentMethod || order.paymentMethod
    });

    // Clear cart after successful payment
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (cart) {
      await cart.update({
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
      console.log('Cart cleared after payment success for user:', req.user.id);
    }

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate invoice
router.get('/:id/invoice', protect, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const invoice = {
      orderNumber: order.orderNumber,
      orderDate: order.createdAt,
      customer: {
        name: req.user.name,
        email: req.user.email
      },
      items: order.items,
      subtotal: order.subtotal,
      shippingCost: order.shippingCost,
      tax: order.tax,
      total: order.total,
      paymentMethod: order.paymentMethod,
      shippingAddress: order.shippingAddress
    };

    res.json({
      success: true,
      invoice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;