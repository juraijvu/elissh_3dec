import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect, authorize } from '../middleware/auth.js';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created upload directory:', uploadDir);
} else {
  console.log('Upload directory exists:', uploadDir);
}

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Multer destination called, uploadDir:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Simple test route
router.post('/test-simple', (req, res) => {
  console.log('Simple test route hit');
  res.json({ success: true, message: 'Route working' });
});

// Test upload without auth
router.post('/test-image', (req, res) => {
  console.log('Test upload route hit');
  
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ success: false, message: err.message });
    }
    
    console.log('File received:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/products/${req.file.filename}`;
    res.json({
      success: true,
      imageUrl,
      filename: req.file.filename
    });
  });
});

// Upload single image
router.post('/image', protect, authorize('admin'), upload.single('image'), (req, res) => {
  console.log('Upload route hit, user:', req.user?.email);
  console.log('File received:', req.file);
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/products/${req.file.filename}`;
    console.log('Image uploaded successfully:', imageUrl);
    
    res.json({
      success: true,
      imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload processing error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload multiple images
router.post('/images', protect, authorize('admin'), upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
    console.log('Images uploaded successfully:', imageUrls);
    
    res.json({
      success: true,
      imageUrls,
      filenames: req.files.map(file => file.filename)
    });
  } catch (error) {
    console.error('Upload processing error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    console.error('Multer error:', error);
    return res.status(400).json({ 
      success: false, 
      message: `Upload error: ${error.message}` 
    });
  }
  
  if (error) {
    console.error('Upload route error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Upload failed' 
    });
  }
  
  next();
});

export default router;