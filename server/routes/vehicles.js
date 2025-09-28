const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { body, validationResult } = require('express-validator');
const { mockVehicles } = require('../mockData');
const { getVehicleImages, getVehicleColors } = require('../localVehicleImages');

// Get all vehicles with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      brand,
      type,
      fuelType,
      minPrice,
      maxPrice,
      search,
      isUsed,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Use mock data if MongoDB is not available
    let vehicles = [...mockVehicles];

    // Apply filters
    if (brand) {
      vehicles = vehicles.filter(v => v.brand.toLowerCase().includes(brand.toLowerCase()));
    }
    if (type) {
      vehicles = vehicles.filter(v => v.type === type);
    }
    if (fuelType) {
      vehicles = vehicles.filter(v => v.fuelType === fuelType);
    }
    if (minPrice) {
      vehicles = vehicles.filter(v => v.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      vehicles = vehicles.filter(v => v.price <= parseInt(maxPrice));
    }
    if (search) {
      const searchLower = search.toLowerCase();
      vehicles = vehicles.filter(v => 
        v.name.toLowerCase().includes(searchLower) ||
        v.brand.toLowerCase().includes(searchLower) ||
        v.model.toLowerCase().includes(searchLower)
      );
    }
    if (isUsed !== undefined && isUsed !== '') {
      const isUsedBool = isUsed === 'true';
      vehicles = vehicles.filter(v => v.isUsed === isUsedBool);
    }

    // Apply sorting
    vehicles.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'price':
          aVal = a.price;
          bVal = b.price;
          break;
        case 'rating':
          aVal = a.rating;
          bVal = b.rating;
          break;
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        default:
          aVal = a._id;
          bVal = b._id;
      }
      
      if (sortOrder === 'desc') {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedVehicles = vehicles.slice(startIndex, endIndex);

    res.json({
      vehicles: paginatedVehicles,
      totalPages: Math.ceil(vehicles.length / limit),
      currentPage: parseInt(page),
      total: vehicles.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get new launches
router.get('/launches/new', async (req, res) => {
  try {
    // Use mock data if MongoDB is not available
    const newLaunches = mockVehicles
      .filter(v => v.isNewLaunch)
      .sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate))
      .slice(0, 10);

    res.json(newLaunches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular vehicles
router.get('/popular', async (req, res) => {
  try {
    // Use mock data if MongoDB is not available
    const popularVehicles = mockVehicles
      .filter(v => v.isAvailable)
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviews.length - a.reviews.length;
      })
      .slice(0, 8);

    res.json(popularVehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    // Use mock data if MongoDB is not available
    const vehicle = mockVehicles.find(v => v._id === req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Add local images to vehicle data
    const vehicleWithImages = {
      ...vehicle,
      images: getVehicleImages(vehicle.name, vehicle.colors?.[0]?.name || ''),
      availableColors: getVehicleColors(vehicle.name)
    };

    res.json(vehicleWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vehicle images by name and color
router.get('/:name/images/:color', (req, res) => {
  try {
    const { name, color } = req.params;
    const decodedName = decodeURIComponent(name);
    const decodedColor = decodeURIComponent(color);
    
    const images = getVehicleImages(decodedName, decodedColor);
    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available colors for a vehicle
router.get('/:name/colors', (req, res) => {
  try {
    const { name } = req.params;
    const decodedName = decodeURIComponent(name);
    
    const colors = getVehicleColors(decodedName);
    res.json({ colors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Compare vehicles
router.post('/compare', async (req, res) => {
  try {
    const { vehicleIds } = req.body;
    
    if (!vehicleIds || vehicleIds.length < 2 || vehicleIds.length > 4) {
      return res.status(400).json({ 
        message: 'Please select 2-4 vehicles to compare' 
      });
    }

    // Use mock data if MongoDB is not available
    const vehicles = mockVehicles.filter(v => vehicleIds.includes(v._id));

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add review
router.post('/:id/reviews', [
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').isLength({ min: 10 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const review = {
      userId: req.body.userId,
      rating: req.body.rating,
      comment: req.body.comment
    };

    vehicle.reviews.push(review);
    
    // Update average rating
    const totalRating = vehicle.reviews.reduce((sum, review) => sum + review.rating, 0);
    vehicle.rating = totalRating / vehicle.reviews.length;

    await vehicle.save();

    res.json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
