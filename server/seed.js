const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
const Showroom = require('./models/Showroom');
const User = require('./models/User');
require('dotenv').config();

const sampleVehicles = [
  {
    name: "Honda Activa 6G",
    brand: "Honda",
    model: "Activa 6G",
    year: 2024,
    type: "Scooter",
    fuelType: "Petrol",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"
    ],
    specifications: {
      engine: "109.19cc",
      power: "7.68 bhp",
      torque: "8.79 Nm",
      mileage: "60 kmpl",
      weight: "108 kg",
      dimensions: "1830 x 710 x 1150 mm",
      fuelCapacity: "5.3 liters",
      transmission: "CVT",
      brakes: "Drum (F&R)",
      suspension: "Telescopic (F), Unit Swing (R)",
      wheels: "Tubeless",
      features: ["LED Headlight", "Digital Console", "Mobile Charging", "External Fuel Filler"]
    },
    colors: [
      { name: "Pearl Shining Black", hexCode: "#000000" },
      { name: "Pearl Shining White", hexCode: "#FFFFFF" },
      { name: "Pearl Shining Red", hexCode: "#FF0000" }
    ],
    variants: [
      { name: "Standard", price: 75000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 78000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-15'),
    isAvailable: true,
    rating: 4.5,
    reviews: []
  },
  {
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    model: "Pulsar NS200",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 145000,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"
    ],
    specifications: {
      engine: "199.5cc",
      power: "24.5 bhp",
      torque: "18.5 Nm",
      mileage: "40 kmpl",
      weight: "156 kg",
      dimensions: "2017 x 804 x 1060 mm",
      fuelCapacity: "12 liters",
      transmission: "6-Speed Manual",
      brakes: "Disc (F&R) with ABS",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Digital Console", "LED Headlight", "ABS", "Clip-on Handlebars"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#DC2626" },
      { name: "Pearl White", hexCode: "#FFFFFF" },
      { name: "Metallic Blue", hexCode: "#2563EB" }
    ],
    variants: [
      { name: "Standard", price: 145000, features: ["Basic Console", "Standard Colors"] },
      { name: "ABS", price: 155000, features: ["Digital Console", "ABS", "All Colors"] }
    ],
    isNewLaunch: false,
    isAvailable: true,
    rating: 4.3,
    reviews: []
  },
  {
    name: "TVS iQube Electric",
    brand: "TVS",
    model: "iQube Electric",
    year: 2024,
    type: "Electric Vehicle",
    fuelType: "Electric",
    price: 120000,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"
    ],
    specifications: {
      engine: "Electric Motor",
      power: "4.4 kW",
      torque: "140 Nm",
      mileage: "100 km per charge",
      weight: "118 kg",
      dimensions: "1850 x 700 x 1150 mm",
      fuelCapacity: "3.4 kWh Battery",
      transmission: "Automatic",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Unit Swing (R)",
      wheels: "Tubeless",
      features: ["Digital Console", "LED Headlight", "Mobile App", "Fast Charging", "Regenerative Braking"]
    },
    colors: [
      { name: "Electric Blue", hexCode: "#3B82F6" },
      { name: "Pearl White", hexCode: "#FFFFFF" },
      { name: "Metallic Grey", hexCode: "#6B7280" }
    ],
    variants: [
      { name: "Standard", price: 120000, features: ["Basic Console", "Standard Charging"] },
      { name: "S", price: 135000, features: ["Digital Console", "Fast Charging", "Mobile App"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-02-01'),
    isAvailable: true,
    rating: 4.7,
    reviews: []
  },
  {
    name: "Hero Splendor Plus",
    brand: "Hero",
    model: "Splendor Plus",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 75000,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"
    ],
    specifications: {
      engine: "97.2cc",
      power: "8.02 bhp",
      torque: "8.05 Nm",
      mileage: "65 kmpl",
      weight: "112 kg",
      dimensions: "2015 x 750 x 1095 mm",
      fuelCapacity: "9.5 liters",
      transmission: "4-Speed Manual",
      brakes: "Drum (F&R)",
      suspension: "Telescopic (F), Swing Arm (R)",
      wheels: "Spoke",
      features: ["Digital Console", "LED Headlight", "Mobile Charging", "Side Stand Indicator"]
    },
    colors: [
      { name: "Sports Red", hexCode: "#DC2626" },
      { name: "Pearl White", hexCode: "#FFFFFF" },
      { name: "Black with Red", hexCode: "#000000" }
    ],
    variants: [
      { name: "Standard", price: 75000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 78000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: false,
    isAvailable: true,
    rating: 4.2,
    reviews: []
  },
  {
    name: "Yamaha R15 V4",
    brand: "Yamaha",
    model: "R15 V4",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 185000,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"
    ],
    specifications: {
      engine: "155cc",
      power: "18.4 bhp",
      torque: "14.2 Nm",
      mileage: "45 kmpl",
      weight: "142 kg",
      dimensions: "1990 x 725 x 1135 mm",
      fuelCapacity: "11 liters",
      transmission: "6-Speed Manual",
      brakes: "Disc (F&R) with ABS",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Digital Console", "LED Headlight", "ABS", "Variable Valve Actuation", "Slipper Clutch"]
    },
    colors: [
      { name: "Racing Blue", hexCode: "#2563EB" },
      { name: "Thunder Grey", hexCode: "#6B7280" },
      { name: "Dark Knight", hexCode: "#000000" }
    ],
    variants: [
      { name: "Standard", price: 185000, features: ["Basic Console", "Standard Colors"] },
      { name: "M", price: 195000, features: ["Digital Console", "ABS", "All Colors", "Slipper Clutch"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-20'),
    isAvailable: true,
    rating: 4.6,
    reviews: []
  },
  {
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    model: "Classic 350",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 195000,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"
    ],
    specifications: {
      engine: "349cc",
      power: "20.2 bhp",
      torque: "27 Nm",
      mileage: "35 kmpl",
      weight: "195 kg",
      dimensions: "2145 x 785 x 1090 mm",
      fuelCapacity: "13 liters",
      transmission: "5-Speed Manual",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Twin Tube (R)",
      wheels: "Spoke",
      features: ["Digital Console", "LED Headlight", "Tripper Navigation", "USB Charging", "Classic Design"]
    },
    colors: [
      { name: "Gunmetal Grey", hexCode: "#6B7280" },
      { name: "Halcyon Green", hexCode: "#059669" },
      { name: "Chrome Red", hexCode: "#DC2626" }
    ],
    variants: [
      { name: "Standard", price: 195000, features: ["Basic Console", "Standard Colors"] },
      { name: "Signals", price: 205000, features: ["Digital Console", "Tripper Navigation", "All Colors"] }
    ],
    isNewLaunch: false,
    isAvailable: true,
    rating: 4.4,
    reviews: []
  }
];

const sampleShowrooms = [
  {
    name: "Honda Showroom - Mumbai Central",
    brand: "Honda",
    address: {
      street: "123 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    coordinates: {
      latitude: 19.0760,
      longitude: 72.8777
    },
    contact: {
      phone: "+91 98765 43210",
      email: "mumbai@honda.com",
      website: "https://honda.com"
    },
    timings: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance"],
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"],
    rating: 4.5,
    isActive: true,
    availableVehicles: []
  },
  {
    name: "Bajaj Showroom - Delhi",
    brand: "Bajaj",
    address: {
      street: "456 Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India"
    },
    coordinates: {
      latitude: 28.6139,
      longitude: 77.2090
    },
    contact: {
      phone: "+91 98765 43211",
      email: "delhi@bajaj.com",
      website: "https://bajaj.com"
    },
    timings: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance"],
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"],
    rating: 4.3,
    isActive: true,
    availableVehicles: []
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moto-matrix');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Vehicle.deleteMany({});
    await Showroom.deleteMany({});
    console.log('Cleared existing data');

    // Create showrooms first
    const createdShowrooms = await Showroom.insertMany(sampleShowrooms);
    console.log(`Created ${createdShowrooms.length} showrooms`);

    // Assign showrooms to vehicles
    const vehiclesWithShowrooms = sampleVehicles.map((vehicle, index) => {
      const showroomIndex = index % createdShowrooms.length;
      return {
        ...vehicle,
        showroomId: createdShowrooms[showroomIndex]._id
      };
    });

    // Create vehicles
    const createdVehicles = await Vehicle.insertMany(vehiclesWithShowrooms);
    console.log(`Created ${createdVehicles.length} vehicles`);

    // Update showrooms with available vehicles
    for (let i = 0; i < createdShowrooms.length; i++) {
      const showroomVehicles = createdVehicles.filter(
        vehicle => vehicle.showroomId.toString() === createdShowrooms[i]._id.toString()
      );
      await Showroom.findByIdAndUpdate(createdShowrooms[i]._id, {
        availableVehicles: showroomVehicles.map(v => v._id)
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
