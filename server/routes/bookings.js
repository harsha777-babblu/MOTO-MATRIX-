const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const Showroom = require('../models/Showroom');
const { body, validationResult } = require('express-validator');

// Create booking
router.post('/', [
  body('vehicleId').isMongoId(),
  body('showroomId').isMongoId(),
  body('type').isIn(['test_ride', 'service', 'inquiry']),
  body('preferredDate').isISO8601(),
  body('preferredTime').isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      vehicleId,
      showroomId,
      type,
      preferredDate,
      preferredTime,
      notes,
      contactInfo
    } = req.body;

    // Verify vehicle and showroom exist
    const vehicle = await Vehicle.findById(vehicleId);
    const showroom = await Showroom.findById(showroomId);

    if (!vehicle || !showroom) {
      return res.status(404).json({ message: 'Vehicle or showroom not found' });
    }

    const booking = new Booking({
      user: req.body.userId, // This should come from auth middleware
      vehicle: vehicleId,
      showroom: showroomId,
      type,
      preferredDate,
      preferredTime,
      notes,
      contactInfo
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('vehicle', 'name brand model images price')
      .populate('showroom', 'name address contact')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.patch('/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('vehicle showroom user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
