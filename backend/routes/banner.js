import express from 'express';
import { Op } from 'sequelize';
import multer from 'multer';
import path from 'path';
import Banner from '../models/Banner.js';
import { protect, authorize } from '../middleware/auth.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/banners/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'banner-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const router = express.Router();

// Public routes - Get banners by area
router.get('/:area', async (req, res) => {
  try {
    const { area } = req.params;
    const { position } = req.query;
    
    let whereClause = { 
      area, 
      isActive: true,
      [Op.or]: [
        { startDate: null },
        { startDate: { [Op.lte]: new Date() } }
      ],
      [Op.or]: [
        { endDate: null },
        { endDate: { [Op.gte]: new Date() } }
      ]
    };
    
    // Add position filter for category banners
    if (position) {
      whereClause.position = position;
    }
    
    const banners = await Banner.findAll({
      where: whereClause,
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });
    
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all banners for admin
router.get('/admin/all', protect, authorize('admin', 'storemanager'), async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [['area', 'ASC'], ['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get banners by area for admin (temporarily public for testing)  
router.get('/admin/:area', async (req, res) => {
  try {
    const { area } = req.params;
    const banners = await Banner.findAll({
      where: { area },
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create banner with file upload (protected)
router.post('/', protect, authorize('admin', 'storemanager'), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }]), async (req, res) => {
  try {
    const bannerData = { ...req.body };
    
    if (req.files?.image) {
      bannerData.image = `/uploads/banners/${req.files.image[0].filename}`;
    }
    
    if (req.files?.mobileImage) {
      bannerData.mobileImage = `/uploads/banners/${req.files.mobileImage[0].filename}`;
    }
    
    const banner = await Banner.create(bannerData);
    res.status(201).json({ success: true, banner });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create banner without file upload (JSON only) (protected)
router.post('/json', protect, authorize('admin', 'storemanager'), async (req, res) => {
  try {
    console.log('=== BANNER CREATE REQUEST ===');
    console.log('Create data:', req.body);
    console.log('User:', req.user?.email);
    
    const bannerData = { ...req.body };
    
    // Set default image if not provided
    if (!bannerData.image || bannerData.image === 'will-be-uploaded') {
      bannerData.image = '/placeholder.svg';
    }
    
    // Remove placeholder mobile image
    if (bannerData.mobileImage === 'will-be-uploaded') {
      delete bannerData.mobileImage;
    }
    
    console.log('Final create data:', bannerData);
    
    const banner = await Banner.create(bannerData);
    
    console.log('Banner created successfully:', banner.toJSON());
    res.status(201).json({ success: true, banner });
  } catch (error) {
    console.error('=== BANNER CREATE ERROR ===');
    console.error('Error details:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update banner with file upload (protected)
router.put('/:id', protect, authorize('admin', 'storemanager'), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }]), async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    
    const updateData = { ...req.body };
    
    // Convert string booleans to actual booleans
    if (updateData.isActive !== undefined) {
      updateData.isActive = updateData.isActive === 'true' || updateData.isActive === true;
    }
    
    // Convert string numbers to actual numbers
    if (updateData.sortOrder !== undefined) {
      updateData.sortOrder = parseInt(updateData.sortOrder) || 0;
    }
    if (updateData.overlayOpacity !== undefined) {
      updateData.overlayOpacity = parseFloat(updateData.overlayOpacity) || 0.3;
    }
    
    if (req.files?.image) {
      updateData.image = `/uploads/banners/${req.files.image[0].filename}`;
    }
    
    if (req.files?.mobileImage) {
      updateData.mobileImage = `/uploads/banners/${req.files.mobileImage[0].filename}`;
    }
    
    await banner.update(updateData);
    
    console.log('Banner updated successfully:', banner.id);
    res.json({ success: true, banner });
  } catch (error) {
    console.error('Banner update error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update banner without file upload (JSON only) (protected)
router.put('/:id/json', protect, authorize('admin', 'storemanager'), async (req, res) => {
  try {
    console.log('=== BANNER UPDATE REQUEST ===');
    console.log('Banner ID:', req.params.id);
    console.log('Update data:', req.body);
    console.log('User:', req.user?.email);
    
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      console.log('Banner not found:', req.params.id);
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    
    console.log('Current banner data:', banner.toJSON());
    
    const updateData = { ...req.body };
    
    // Don't update image fields if they're placeholder values
    if (updateData.image === 'will-be-uploaded') {
      delete updateData.image;
    }
    if (updateData.mobileImage === 'will-be-uploaded') {
      delete updateData.mobileImage;
    }
    
    console.log('Final update data:', updateData);
    
    const updatedBanner = await banner.update(updateData);
    
    console.log('Banner updated successfully:', updatedBanner.toJSON());
    res.json({ success: true, banner: updatedBanner });
  } catch (error) {
    console.error('=== BANNER UPDATE ERROR ===');
    console.error('Error details:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete banner (protected)
router.delete('/:id', protect, authorize('admin', 'storemanager'), async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    await banner.destroy();
    res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Track banner click
router.post('/:id/click', async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (banner) {
      await banner.increment('clickCount');
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test endpoint to get a specific banner
router.get('/test/:id', async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;