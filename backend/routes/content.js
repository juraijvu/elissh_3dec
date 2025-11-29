import express from 'express';
import Content from '../models/Content.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all content by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const content = await Content.findAll({
      where: { type, isActive: true },
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin routes
router.use(protect);
router.use(authorize('admin', 'storemanager'));

// Get all content for admin
router.get('/admin/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const content = await Content.findAll({
      where: { type },
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create content
router.post('/', async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update content
router.put('/:id', async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    await content.update(req.body);
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete content
router.delete('/:id', async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    await content.destroy();
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;