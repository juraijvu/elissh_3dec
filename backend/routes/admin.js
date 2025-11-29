import express from 'express';
import { Op } from 'sequelize';
import { Product, Category, Banner, User, Order } from '../models/index.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Protect all admin routes
router.use(protect);
router.use(admin);

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalBanners,
      totalUsers,
      totalOrders,
      recentOrders,
      lowStockProducts,
      recentUsers
    ] = await Promise.all([
      Product.count(),
      Category.count(),
      Banner.count(),
      User.count(),
      Order.count(),
      Order.findAll({
        include: [{
          model: User,
          as: 'User',
          attributes: ['id', 'name', 'email', 'firstName', 'lastName']
        }],
        order: [['createdAt', 'DESC']],
        limit: 5
      }),
      Product.findAll({
        where: {
          stock: { [Op.lte]: 10 }
        },
        limit: 10,
        order: [['stock', 'ASC']]
      }),
      User.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
        attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt']
      })
    ]);

    // Calculate revenue (sum of completed orders)
    const revenueResult = await Order.sum('total', {
      where: {
        status: ['delivered', 'completed']
      }
    });

    const revenue = revenueResult || 0;

    res.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          totalCategories,
          totalBanners,
          totalUsers,
          totalOrders,
          revenue,
          stockAlerts: lowStockProducts.length,
          verifiedUsers: totalUsers, // Simplified for now
          totalLoyaltyPoints: 0, // Will be calculated when wallet system is implemented
          totalWalletBalance: 0, // Will be calculated when wallet system is implemented
          avgLoyaltyPoints: 0, // Will be calculated when wallet system is implemented
          totalProductValue: 0, // Will be calculated
          avgProductPrice: 0 // Will be calculated
        },
        recentOrders,
        lowStockProducts,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all products for admin
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Admin products error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all categories for admin
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Admin categories error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create product
router.post('/products', async (req, res) => {
  try {
    console.log('Creating product with data:', req.body);
    
    // Generate unique SKU if not provided
    if (!req.body.sku) {
      req.body.sku = `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    const product = await Product.create(req.body);
    console.log('Product created successfully:', product.id);
    
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }
    
    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists. Please use a different SKU.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    await product.update(req.body);
    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    await product.destroy();
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;