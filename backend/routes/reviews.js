import express from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create review
router.post('/', protect, async (req, res) => {
  try {
    const { product, rating, title, comment } = req.body;

    const existingReview = await Review.findOne({ user: req.user.id, product });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user.id,
      product,
      rating,
      title,
      comment
    });

    // Update product rating
    const reviews = await Review.find({ product, isApproved: true });
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(product, {
      'rating.average': avgRating,
      'rating.count': reviews.length
    });

    await review.populate('user', 'firstName lastName');

    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product reviews
router.get('/product/:productId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ 
      product: req.params.productId, 
      isApproved: true 
    })
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ 
      product: req.params.productId, 
      isApproved: true 
    });

    res.json({
      success: true,
      reviews,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;