const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('wishlist', 'name brand model price images');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to wishlist
router.post('/:id/wishlist', async (req, res) => {
  try {
    const { vehicleId } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.wishlist.includes(vehicleId)) {
      user.wishlist.push(vehicleId);
      await user.save();
    }

    res.json({ message: 'Added to wishlist successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from wishlist
router.delete('/:id/wishlist/:vehicleId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.vehicleId
    );
    await user.save();

    res.json({ message: 'Removed from wishlist successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user preferences
router.patch('/:id/preferences', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { preferences: req.body },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Preferences updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
