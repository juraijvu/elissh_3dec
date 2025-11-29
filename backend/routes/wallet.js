import express from 'express';
import { Wallet, User } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user wallet
router.get('/my-wallet', protect, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ where: { userId: req.user.id } });
    
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user.id });
    }
    
    res.json({ success: true, wallet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add loyalty points
router.post('/add-points', protect, async (req, res) => {
  try {
    const { points, reason } = req.body;
    
    let wallet = await Wallet.findOne({ where: { userId: req.user.id } });
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user.id });
    }
    
    wallet.loyaltyPoints += points;
    await wallet.save();
    
    res.json({ 
      success: true, 
      message: `${points} points added for ${reason}`,
      wallet 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Redeem loyalty points
router.post('/redeem-points', protect, async (req, res) => {
  try {
    const { points } = req.body;
    
    const wallet = await Wallet.findOne({ where: { userId: req.user.id } });
    if (!wallet || wallet.loyaltyPoints < points) {
      return res.status(400).json({ message: 'Insufficient loyalty points' });
    }
    
    const cashValue = points * 0.01; // 1 point = 0.01 AED
    wallet.loyaltyPoints -= points;
    wallet.balance += cashValue;
    await wallet.save();
    
    res.json({ 
      success: true, 
      message: `${points} points redeemed for AED ${cashValue}`,
      wallet 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;