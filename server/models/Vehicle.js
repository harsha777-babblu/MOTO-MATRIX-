const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Bike', 'Scooter', 'Electric Vehicle'],
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Electric', 'Hybrid'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  specifications: {
    engine: String,
    power: String,
    torque: String,
    mileage: String,
    weight: String,
    dimensions: String,
    fuelCapacity: String,
    transmission: String,
    brakes: String,
    suspension: String,
    wheels: String,
    features: [String]
  },
  colors: [{
    name: String,
    hexCode: String,
    image: String
  }],
  variants: [{
    name: String,
    price: Number,
    features: [String]
  }],
  isNewLaunch: {
    type: Boolean,
    default: false
  },
  launchDate: Date,
  isAvailable: {
    type: Boolean,
    default: true
  },
  showroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Showroom'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
