const express = require('express');
const router = express.Router();
const Showroom = require('../models/Showroom');

// Mock showroom data for demonstration
const mockShowrooms = [
  {
    _id: "1",
    name: "Honda Showroom - Mumbai Central",
    brand: "Honda",
    address: {
      street: "123 MG Road, Near Central Station",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    contact: {
      phone: "+91 98765 43210",
      email: "mumbai@honda.com",
      website: "www.honda.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance", "Test Ride"],
    rating: 4.5,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Insurance Assistance"],
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "2",
    name: "Bajaj Auto - Delhi NCR",
    brand: "Bajaj",
    address: {
      street: "456 Connaught Place, Block A",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    contact: {
      phone: "+91 98765 43211",
      email: "delhi@bajajauto.com",
      website: "www.bajajauto.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance"],
    rating: 4.3,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "3",
    name: "TVS Showroom - Bangalore",
    brand: "TVS",
    address: {
      street: "789 Brigade Road, Near MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    contact: {
      phone: "+91 98765 43212",
      email: "bangalore@tvsmotor.com",
      website: "www.tvsmotor.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Test Ride"],
    rating: 4.4,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "Insurance Assistance"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "4",
    name: "Hero MotoCorp - Chennai",
    brand: "Hero",
    address: {
      street: "321 Anna Salai, Teynampet",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600018",
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    contact: {
      phone: "+91 98765 43213",
      email: "chennai@heromotocorp.com",
      website: "www.heromotocorp.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance", "Test Ride"],
    rating: 4.6,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Insurance Assistance"],
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "5",
    name: "Yamaha Motors - Kolkata",
    brand: "Yamaha",
    address: {
      street: "654 Park Street, Near Metro Station",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016",
      coordinates: { lat: 22.5726, lng: 88.3639 }
    },
    contact: {
      phone: "+91 98765 43214",
      email: "kolkata@yamaha-motor-india.com",
      website: "www.yamaha-motor-india.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance"],
    rating: 4.2,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "6",
    name: "Royal Enfield - Pune",
    brand: "Royal Enfield",
    address: {
      street: "987 FC Road, Near Deccan Gymkhana",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411004",
      coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    contact: {
      phone: "+91 98765 43215",
      email: "pune@royalenfield.com",
      website: "www.royalenfield.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance", "Test Ride"],
    rating: 4.7,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Insurance Assistance", "Customization"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "7",
    name: "KTM Showroom - Hyderabad",
    brand: "KTM",
    address: {
      street: "147 Banjara Hills, Road No. 12",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500034",
      coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    contact: {
      phone: "+91 98765 43216",
      email: "hyderabad@ktm.com",
      website: "www.ktm.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance"],
    rating: 4.4,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Racing Accessories"],
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "8",
    name: "Ola Electric - Ahmedabad",
    brand: "Ola",
    address: {
      street: "258 CG Road, Near Law Garden",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380006",
      coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    contact: {
      phone: "+91 98765 43217",
      email: "ahmedabad@olaelectric.com",
      website: "www.olaelectric.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance", "Test Ride"],
    rating: 4.1,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Battery Swapping"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "9",
    name: "Suzuki Access 125 - Jaipur",
    brand: "Suzuki",
    address: {
      street: "456 C-Scheme, Near Central Park",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      coordinates: { lat: 26.9124, lng: 75.7873 }
    },
    contact: {
      phone: "+91 98765 43218",
      email: "jaipur@suzukimotorcycle.in",
      website: "www.suzukimotorcycle.in"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance"],
    rating: 4.2,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Insurance Assistance"],
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "10",
    name: "Bajaj Pulsar - Lucknow",
    brand: "Bajaj",
    address: {
      street: "789 Hazratganj, Near Clock Tower",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226001",
      coordinates: { lat: 26.8467, lng: 80.9462 }
    },
    contact: {
      phone: "+91 98765 43219",
      email: "lucknow@bajajauto.com",
      website: "www.bajajauto.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance", "Test Ride"],
    rating: 4.3,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Racing Accessories"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "11",
    name: "TVS Apache - Indore",
    brand: "TVS",
    address: {
      street: "321 MG Road, Near Rajwada Palace",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452001",
      coordinates: { lat: 22.7196, lng: 75.8577 }
    },
    contact: {
      phone: "+91 98765 43220",
      email: "indore@tvsmotor.com",
      website: "www.tvsmotor.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Test Ride"],
    rating: 4.4,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "Insurance Assistance", "Racing Setup"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "12",
    name: "Hero Splendor - Coimbatore",
    brand: "Hero",
    address: {
      street: "654 DB Road, Near Railway Station",
      city: "Coimbatore",
      state: "Tamil Nadu",
      pincode: "641001",
      coordinates: { lat: 11.0168, lng: 76.9558 }
    },
    contact: {
      phone: "+91 98765 43221",
      email: "coimbatore@heromotocorp.com",
      website: "www.heromotocorp.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance", "Test Ride"],
    rating: 4.5,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Insurance Assistance"],
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "13",
    name: "Yamaha FZ - Kochi",
    brand: "Yamaha",
    address: {
      street: "987 MG Road, Near Marine Drive",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",
      coordinates: { lat: 9.9312, lng: 76.2673 }
    },
    contact: {
      phone: "+91 98765 43222",
      email: "kochi@yamaha-motor-india.com",
      website: "www.yamaha-motor-india.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance"],
    rating: 4.2,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Muscle Design"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "14",
    name: "Royal Enfield - Chandigarh",
    brand: "Royal Enfield",
    address: {
      street: "147 Sector 17, Near Rose Garden",
      city: "Chandigarh",
      state: "Chandigarh",
      pincode: "160017",
      coordinates: { lat: 30.7333, lng: 76.7794 }
    },
    contact: {
      phone: "+91 98765 43223",
      email: "chandigarh@royalenfield.com",
      website: "www.royalenfield.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Insurance", "Finance", "Test Ride"],
    rating: 4.7,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Insurance Assistance", "Customization"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "15",
    name: "KTM Duke - Bhopal",
    brand: "KTM",
    address: {
      street: "258 MP Nagar, Near New Market",
      city: "Bhopal",
      state: "Madhya Pradesh",
      pincode: "462011",
      coordinates: { lat: 23.2599, lng: 77.4126 }
    },
    contact: {
      phone: "+91 98765 43224",
      email: "bhopal@ktm.com",
      website: "www.ktm.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance"],
    rating: 4.4,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Racing Accessories"],
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  },
  {
    _id: "16",
    name: "Ather 450X - Mysore",
    brand: "Ather",
    address: {
      street: "369 Devaraja Urs Road, Near Palace",
      city: "Mysore",
      state: "Karnataka",
      pincode: "570001",
      coordinates: { lat: 12.2958, lng: 76.6394 }
    },
    contact: {
      phone: "+91 98765 43225",
      email: "mysore@ather.com",
      website: "www.ather.com"
    },
    services: ["Sales", "Service", "Spare Parts", "Finance", "Test Ride"],
    rating: 4.3,
    timings: {
      weekdays: "9:00 AM - 7:00 PM",
      weekends: "10:00 AM - 6:00 PM"
    },
    features: ["Authorized Dealer", "Free Test Drive", "EMI Available", "Fast Charging"],
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  }
];

// Get all showrooms with filtering
router.get('/', async (req, res) => {
  try {
    let filteredShowrooms = [...mockShowrooms];
    
    // Apply filters
    if (req.query.city) {
      filteredShowrooms = filteredShowrooms.filter(showroom => 
        showroom.address.city.toLowerCase().includes(req.query.city.toLowerCase())
      );
    }
    
    if (req.query.brand) {
      filteredShowrooms = filteredShowrooms.filter(showroom => 
        showroom.brand.toLowerCase() === req.query.brand.toLowerCase()
      );
    }
    
    if (req.query.service) {
      filteredShowrooms = filteredShowrooms.filter(showroom => 
        showroom.services.includes(req.query.service)
      );
    }
    
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredShowrooms = filteredShowrooms.filter(showroom => 
        showroom.name.toLowerCase().includes(searchTerm) ||
        showroom.address.city.toLowerCase().includes(searchTerm) ||
        showroom.address.street.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by rating
    filteredShowrooms.sort((a, b) => b.rating - a.rating);

    res.json({
      showrooms: filteredShowrooms,
      total: filteredShowrooms.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get showroom by ID
router.get('/:id', async (req, res) => {
  try {
    const showroom = mockShowrooms.find(s => s._id === req.params.id);
    if (!showroom) {
      return res.status(404).json({ message: 'Showroom not found' });
    }
    res.json(showroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Find nearby showrooms
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng, radius = 50 } = req.params;

    const showrooms = await Showroom.find({
      isActive: true,
      'coordinates.latitude': {
        $gte: parseFloat(lat) - (radius / 111),
        $lte: parseFloat(lat) + (radius / 111)
      },
      'coordinates.longitude': {
        $gte: parseFloat(lng) - (radius / 111),
        $lte: parseFloat(lng) + (radius / 111)
      }
    }).populate('availableVehicles', 'name brand model price images');

    res.json(showrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
