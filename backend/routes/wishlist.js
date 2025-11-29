import express from 'express';
import { Wishlist, Product } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user wishlist
router.get('/', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.id, items: [] });
    }

    // Get product details for wishlist items
    if (wishlist.items && wishlist.items.length > 0) {
      const productIds = wishlist.items.map(item => item.productId);
      const products = await Product.findAll({ where: { id: productIds } });
      
      wishlist.items = wishlist.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          product: product ? {
            id: product.id,
            name: product.name,
            price: product.price,
            images: product.images,
            brand: product.brand
          } : null
        };
      });
    }

    res.json({
      success: true,
      wishlist
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to wishlist
router.post('/add/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.id, items: [] });
    }

    let items = wishlist.items || [];
    const existingItem = items.find(item => item.productId === parseInt(productId));

    if (existingItem) {
      return res.status(400).json({ message: 'Item already in wishlist' });
    }

    items.push({ productId: parseInt(productId), addedAt: new Date() });
    wishlist.items = items;
    await wishlist.save();

    res.json({
      success: true,
      message: 'Item added to wishlist',
      wishlist
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from wishlist
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    let items = wishlist.items || [];
    items = items.filter(item => item.productId !== parseInt(productId));
    
    wishlist.items = items;
    await wishlist.save();

    res.json({
      success: true,
      wishlist
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;