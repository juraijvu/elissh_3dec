import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user's cart
router.get('/', protect, async (req, res) => {
  try {
    console.log('=== GET CART REQUEST ===');
    console.log('User ID:', req.user.id);
    
    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (!cart) {
      console.log('No cart found, creating new one');
      cart = await Cart.create({ 
        userId: req.user.id, 
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
    }

    console.log('Cart found with', cart.items?.length || 0, 'items');

    // Ensure items is an array
    const items = Array.isArray(cart.items) ? cart.items : [];
    
    // Get product details for cart items
    let cartItemsWithProducts = [];
    
    if (items.length > 0) {
      const productIds = items.map(item => item.productId);
      const products = await Product.findAll({ where: { id: productIds } });
      
      cartItemsWithProducts = items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          id: item.productId,
          productId: item.productId,
          quantity: item.quantity,
          variant: item.variant,
          addedAt: item.addedAt,
          product: product ? {
            id: product.id,
            name: product.name,
            price: product.price,
            images: product.images,
            brand: product.brand,
            stock: product.stock,
            sku: product.sku
          } : null
        };
      }).filter(item => item.product !== null);
    }

    // Calculate totals
    let totalPrice = 0;
    let totalItems = 0;
    
    cartItemsWithProducts.forEach(item => {
      if (item.product) {
        totalPrice += parseFloat(item.product.price) * item.quantity;
        totalItems += item.quantity;
      }
    });

    console.log('Returning cart with totals:', { totalItems, totalPrice });
    
    res.json({
      success: true,
      cart: {
        id: cart.id,
        userId: cart.userId,
        items: cartItemsWithProducts,
        totalItems: totalItems,
        totalPrice: totalPrice,
        updatedAt: cart.updatedAt
      }
    });
    
  } catch (error) {
    console.error('=== GET CART ERROR ===');
    console.error('Error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get cart',
      error: error.message 
    });
  }
});

// Add item to cart
router.post('/add', protect, async (req, res) => {
  try {
    console.log('=== CART ADD REQUEST ===');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);
    
    const { productId, quantity = 1, variant } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Find product
    const product = await Product.findByPk(productId);
    if (!product) {
      console.log('Product not found:', productId);
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log('Product found:', product.name);

    // Check stock
    if (product.stock < quantity) {
      console.log('Insufficient stock:', { stock: product.stock, requested: quantity });
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    
    if (!cart) {
      console.log('Creating new cart for user:', req.user.id);
      cart = await Cart.create({ 
        userId: req.user.id, 
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
    }
    console.log('Cart found/created:', cart.id);

    // Get current items (ensure it's an array)
    let items = Array.isArray(cart.items) ? [...cart.items] : [];
    console.log('Current cart items:', items.length);

    // Check if item already exists
    const existingItemIndex = items.findIndex(item => 
      item.productId === parseInt(productId)
    );

    if (existingItemIndex > -1) {
      // Update existing item
      items[existingItemIndex].quantity += parseInt(quantity);
      console.log('Updated existing item quantity to:', items[existingItemIndex].quantity);
    } else {
      // Add new item
      const newItem = {
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        variant: variant || null,
        addedAt: new Date().toISOString()
      };
      items.push(newItem);
      console.log('Added new item:', newItem);
    }

    // Calculate totals
    let totalPrice = 0;
    let totalItems = 0;
    
    for (const item of items) {
      const itemProduct = await Product.findByPk(item.productId);
      if (itemProduct) {
        totalPrice += parseFloat(itemProduct.price) * item.quantity;
        totalItems += item.quantity;
      }
    }

    console.log('Calculated totals:', { totalItems, totalPrice });

    // Update cart
    await cart.update({
      items: items,
      totalItems: totalItems,
      totalPrice: totalPrice
    });

    console.log('Cart updated successfully');

    // Fetch updated cart with product details
    const updatedCart = await Cart.findOne({ where: { userId: req.user.id } });
    
    res.json({
      success: true,
      message: 'Item added to cart successfully',
      cart: updatedCart,
      itemCount: totalItems
    });
    
  } catch (error) {
    console.error('=== CART ADD ERROR ===');
    console.error('Error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add item to cart',
      error: error.message 
    });
  }
});

// Update cart item quantity
router.put('/update/:itemId', protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let items = cart.items || [];
    const itemIndex = items.findIndex(item => item.productId === parseInt(itemId));
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      items.splice(itemIndex, 1);
    } else {
      items[itemIndex].quantity = quantity;
    }

    // Calculate totals
    let totalPrice = 0;
    let totalItems = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        totalPrice += parseFloat(product.price) * item.quantity;
        totalItems += item.quantity;
      }
    }

    cart.items = items;
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    await cart.save();

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', protect, async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let items = cart.items || [];
    items = items.filter(item => item.productId !== parseInt(itemId));

    // Calculate totals
    let totalPrice = 0;
    let totalItems = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        totalPrice += parseFloat(product.price) * item.quantity;
        totalItems += item.quantity;
      }
    }

    cart.items = items;
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    await cart.save();

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;