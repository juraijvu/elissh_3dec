import express from 'express';
import { Category } from '../models/index.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true },
      order: [['sortOrder', 'ASC'], ['name', 'ASC']]
    });

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Get all categories for admin
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Category,
        as: 'children',
        attributes: ['id', 'name', 'slug', 'isActive']
      }, {
        model: Category,
        as: 'parent',
        attributes: ['id', 'name', 'slug']
      }],
      order: [['sortOrder', 'ASC'], ['name', 'ASC']]
    });

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create category
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update category
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = await Category.findByPk(req.params.id);
    res.json({
      success: true,
      category
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete category
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { slug: req.params.slug, isActive: true },
      include: [{
        model: Category,
        as: 'children',
        attributes: ['id', 'name', 'slug']
      }, {
        model: Category,
        as: 'parent',
        attributes: ['id', 'name', 'slug']
      }]
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({
      success: true,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;