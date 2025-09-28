// Mock data for demonstration without MongoDB - 20 Popular Two-Wheelers in India
// Import vehicle images data
const { getVehicleImages, getVehicleColors } = require('./localVehicleImages');

// Function to generate comprehensive reviews for bikes
const generateReviews = (bikeName, bikeType, rating) => {
  const reviewTemplates = {
    performance: [
      "Excellent performance and power delivery!",
      "Great acceleration and top speed for city riding.",
      "Smooth engine with good torque in low revs.",
      "Perfect for highway cruising with stable handling.",
      "Amazing fuel efficiency without compromising on power.",
      "Strong mid-range performance, ideal for overtaking.",
      "Engine feels refined and vibration-free.",
      "Great power-to-weight ratio for its class."
    ],
    comfort: [
      "Very comfortable riding position for long rides.",
      "Excellent seat comfort, can ride for hours without fatigue.",
      "Good suspension setup, handles bumps well.",
      "Ergonomics are perfect for my height and build.",
      "Wind protection is adequate for highway rides.",
      "Comfortable for both rider and pillion.",
      "Smooth ride quality on all road conditions.",
      "Great for daily commuting in city traffic."
    ],
    design: [
      "Stunning looks and aggressive styling!",
      "Beautiful design that turns heads everywhere.",
      "Premium build quality and finish.",
      "Great color options and graphics.",
      "Modern design with classic appeal.",
      "Excellent attention to detail in design.",
      "Sporty appearance with practical features.",
      "Timeless design that won't look outdated."
    ],
    value: [
      "Great value for money in this segment.",
      "Worth every penny spent on this bike.",
      "Excellent features for the price point.",
      "Good resale value in the market.",
      "Affordable maintenance and service costs.",
      "Perfect balance of price and performance.",
      "Great investment for long-term ownership.",
      "Competitive pricing compared to rivals."
    ],
    issues: [
      "Minor vibration at high speeds, but manageable.",
      "Seat could be more comfortable for long rides.",
      "Headlight brightness could be better for night riding.",
      "Some plastic parts feel a bit cheap.",
      "Service center availability could be better.",
      "Brake feel could be more progressive.",
      "Mirror visibility could be improved.",
      "Storage space is limited."
    ]
  };

  const userNames = [
    "Rajesh Kumar", "Priya Sharma", "Amit Singh", "Neha Gupta", "Vikram Patel",
    "Suresh Kumar", "Deepak Verma", "Manoj Singh", "Arjun Reddy", "John Doe",
    "Sarah Wilson", "Michael Chen", "Anita Desai", "Rohit Sharma", "Kavya Nair",
    "Siddharth Joshi", "Pooja Agarwal", "Ravi Kumar", "Shreya Singh", "Karthik Menon",
    "Divya Reddy", "Nikhil Gupta", "Meera Patel", "Aditya Sharma", "Ritu Verma",
    "Sandeep Kumar", "Anjali Joshi", "Rahul Singh", "Kiran Nair", "Vishal Agarwal"
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad",
    "Ahmedabad", "Jaipur", "Lucknow", "Indore", "Coimbatore", "Kochi", "Chandigarh"
  ];

  const reviews = [];
  const numReviews = 25; // Generate 25 reviews per bike

  for (let i = 0; i < numReviews; i++) {
    const userName = userNames[i % userNames.length];
    const city = cities[i % cities.length];
    
    // Generate rating based on overall bike rating with some variation
    const baseRating = rating;
    const variation = Math.random() * 1.5 - 0.75; // -0.75 to +0.75
    const reviewRating = Math.max(1, Math.min(5, Math.round((baseRating + variation) * 2) / 2));
    
    // Select review categories based on rating
    let reviewText = "";
    if (reviewRating >= 4.5) {
      // High rating - mostly positive
      const categories = ['performance', 'comfort', 'design', 'value'];
      const category = categories[Math.floor(Math.random() * categories.length)];
      reviewText = reviewTemplates[category][Math.floor(Math.random() * reviewTemplates[category].length)];
    } else if (reviewRating >= 3.5) {
      // Medium rating - mixed
      const categories = Math.random() > 0.3 ? ['performance', 'comfort', 'design', 'value'] : ['issues'];
      const category = categories[Math.floor(Math.random() * categories.length)];
      reviewText = reviewTemplates[category][Math.floor(Math.random() * reviewTemplates[category].length)];
    } else {
      // Low rating - mostly issues
      const categories = Math.random() > 0.2 ? ['issues'] : ['performance', 'comfort'];
      const category = categories[Math.floor(Math.random() * categories.length)];
      reviewText = reviewTemplates[category][Math.floor(Math.random() * reviewTemplates[category].length)];
    }

    // Add bike-specific details
    if (bikeName.includes('Royal Enfield')) {
      reviewText += " The classic thump sound is amazing!";
    } else if (bikeName.includes('KTM')) {
      reviewText += " The orange color scheme looks fantastic!";
    } else if (bikeName.includes('Yamaha')) {
      reviewText += " Yamaha's reliability is unmatched.";
    } else if (bikeName.includes('Honda')) {
      reviewText += " Honda's build quality is excellent.";
    } else if (bikeName.includes('Electric') || bikeName.includes('EV')) {
      reviewText += " The silent electric ride is so peaceful.";
    }

    // Generate date (random dates in the last 6 months)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 180));

    reviews.push({
      userId: { 
        name: userName,
        location: city,
        verified: Math.random() > 0.3 // 70% verified users
      },
      rating: reviewRating,
      comment: reviewText,
      date: date,
      helpful: Math.floor(Math.random() * 15), // 0-14 helpful votes
      verified: Math.random() > 0.3
    });
  }

  // Sort reviews by date (newest first)
  return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to create used bike variants
const createUsedBike = (originalBike, condition, year, mileage, priceReduction) => {
  const usedBike = {
    ...originalBike,
    _id: `${originalBike._id}_used_${condition}`,
    name: `${originalBike.name} (Used)`,
    year: year,
    isUsed: true,
    condition: condition, // 'excellent', 'good', 'fair'
    mileage: mileage,
    price: Math.round(originalBike.price * (1 - priceReduction)),
    originalPrice: originalBike.price,
    priceReduction: Math.round(priceReduction * 100),
    usedSince: new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    previousOwners: Math.floor(Math.random() * 3) + 1,
    serviceHistory: Math.random() > 0.3 ? 'Complete' : 'Partial',
    accidentHistory: Math.random() > 0.8 ? 'Minor' : 'None',
    warranty: condition === 'excellent' ? '6 months' : condition === 'good' ? '3 months' : 'No warranty',
    isNewLaunch: false,
    rating: Math.max(3.0, originalBike.rating - (condition === 'excellent' ? 0.2 : condition === 'good' ? 0.4 : 0.6)),
    reviews: generateReviews(`${originalBike.name} (Used)`, originalBike.type, Math.max(3.0, originalBike.rating - (condition === 'excellent' ? 0.2 : condition === 'good' ? 0.4 : 0.6))).slice(0, 15) // Fewer reviews for used bikes
  };
  
  return usedBike;
};

const mockVehicles = [
  {
    _id: "1",
    name: "Royal Enfield Hunter 350",
    isUsed: false,
    brand: "Royal Enfield",
    model: "Hunter 350",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 149000,
    images: getVehicleImages("Royal Enfield Hunter 350", "London Red"),
    specifications: {
      engine: "349 cc",
      power: "20.2 bhp",
      torque: "27 Nm",
      mileage: "30-35 kmpl",
      weight: "177 kg",
      dimensions: "2140 x 800 x 1090 mm",
      fuelCapacity: "13.5 liters",
      transmission: "5-speed",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Twin Shock (R)",
      wheels: "Spoke",
      features: ["Retro Street Cruiser", "Compact RE", "Electric Start", "Classic Design"]
    },
    colors: [
      { name: "London Red", hexCode: "#DC143C" },
      { name: "Factory Black", hexCode: "#000000" },
      { name: "Rio White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 149000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 155000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-15'),
    isAvailable: true,
    rating: 4.5,
    reviews: generateReviews("Royal Enfield Hunter 350", "Cruiser", 4.5),
    showroomId: {
      _id: "1",
      name: "Royal Enfield Showroom - Mumbai",
      address: "123 MG Road, Mumbai",
      contact: { phone: "+91 98765 43210" }
    }
  },
  {
    _id: "2",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    model: "Classic 350",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 195000,
    images: getVehicleImages("Royal Enfield Classic 350", "Gunmetal Grey"),
    specifications: {
      engine: "349 cc",
      power: "20.2 bhp",
      torque: "27 Nm",
      mileage: "30-35 kmpl",
      weight: "195 kg",
      dimensions: "2140 x 800 x 1090 mm",
      fuelCapacity: "13.5 liters",
      transmission: "5-speed",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Twin Shock (R)",
      wheels: "Spoke",
      features: ["Iconic Design", "Strong Torque", "Electric Start", "Classic Styling"]
    },
    colors: [
      { name: "Gunmetal Grey", hexCode: "#808080" },
      { name: "Desert Storm", hexCode: "#D2B48C" },
      { name: "Chrome Silver", hexCode: "#C0C0C0" }
    ],
    variants: [
      { name: "Standard", price: 195000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 205000, features: ["Digital Console", "All Colors", "Premium Finish"] }
    ],
    isNewLaunch: false,
    launchDate: new Date('2023-01-01'),
    isAvailable: true,
    rating: 4.6,
    reviews: generateReviews("Royal Enfield Bullet 350", "Classic", 4.6),
    showroomId: {
      _id: "1",
      name: "Royal Enfield Showroom - Mumbai",
      address: "123 MG Road, Mumbai",
      contact: { phone: "+91 98765 43210" }
    }
  },
  {
    _id: "3",
    name: "KTM Duke 160",
    brand: "KTM",
    model: "Duke 160",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 185000,
    images: getVehicleImages("KTM Duke 160", "Orange"),
    specifications: {
      engine: "164 cc",
      power: "18.5 bhp",
      torque: "14 Nm",
      mileage: "35-40 kmpl",
      weight: "159 kg",
      dimensions: "2002 x 800 x 1267 mm",
      fuelCapacity: "13.4 liters",
      transmission: "6-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Aggressive Styling", "USD Forks", "ABS", "LED Headlight"]
    },
    colors: [
      { name: "Orange", hexCode: "#FF8C00" },
      { name: "Black", hexCode: "#000000" },
      { name: "White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 185000, features: ["Basic Console", "Standard Colors"] },
      { name: "Premium", price: 190000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.5,
    reviews: generateReviews("KTM Duke 160", "Naked", 4.5),
    showroomId: {
    _id: "2",
      name: "KTM Showroom - Delhi",
      address: "456 Connaught Place, Delhi",
      contact: { phone: "+91 98765 43211" }
    }
  },
  {
    _id: "4",
    name: "Bajaj Pulsar NS400Z",
    brand: "Bajaj",
    model: "Pulsar NS400Z",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 192000,
    images: getVehicleImages("Bajaj Pulsar NS400Z", "Racing Red"),
    specifications: {
      engine: "373 cc",
      power: "40 bhp",
      torque: "35 Nm",
      mileage: "30-35 kmpl",
      weight: "175 kg",
      dimensions: "2055 x 750 x 1165 mm",
      fuelCapacity: "15 liters",
      transmission: "6-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Powerful Pulsar", "Sporty Looks", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#FF0000" },
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 192000, features: ["Basic Console", "Standard Colors"] },
      { name: "Premium", price: 198000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-02-01'),
    isAvailable: true,
    rating: 4.4,
    reviews: generateReviews("Bajaj Pulsar NS400Z", "Naked", 4.4),
    showroomId: {
      _id: "3",
      name: "Bajaj Showroom - Bangalore",
      address: "789 Brigade Road, Bangalore",
      contact: { phone: "+91 98765 43212" }
    }
  },
  {
    _id: "5",
    name: "Royal Enfield Bullet 350",
    brand: "Royal Enfield",
    model: "Bullet 350",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 176000,
    images: getVehicleImages("Royal Enfield Bullet 350", "Tokyo Black"),
    specifications: {
      engine: "346 cc",
      power: "19.1 bhp",
      torque: "28 Nm",
      mileage: "35 kmpl",
      weight: "195 kg",
      dimensions: "2140 x 800 x 1090 mm",
      fuelCapacity: "13.5 liters",
      transmission: "5-speed",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Twin Shock (R)",
      wheels: "Spoke",
      features: ["Classic Thump", "Heavy Build", "Electric Start", "Retro Styling"]
    },
    colors: [
      { name: "Tokyo Black", hexCode: "#1C1C1C" },
      { name: "Rebel Blue", hexCode: "#4169E1" },
      { name: "Rio White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 176000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 182000, features: ["Digital Console", "All Colors", "Premium Finish"] }
    ],
    isNewLaunch: false,
    launchDate: new Date('2023-01-01'),
    isAvailable: true,
    rating: 4.6,
    reviews: generateReviews("Royal Enfield Classic 350", "Classic", 4.6),
    showroomId: {
      _id: "1",
      name: "Royal Enfield Showroom - Mumbai",
      address: "123 MG Road, Mumbai",
      contact: { phone: "+91 98765 43210" }
    }
  },
  {
    _id: "6",
    name: "Yamaha MT-15 V2",
    brand: "Yamaha",
    model: "MT-15 V2",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 169000,
    images: getVehicleImages("Yamaha MT-15 V2", "Metallic Black"),
    specifications: {
      engine: "155 cc",
      power: "18.4 bhp",
      torque: "14.1 Nm",
      mileage: "40-45 kmpl",
      weight: "138 kg",
      dimensions: "2015 x 780 x 1080 mm",
      fuelCapacity: "10 liters",
      transmission: "6-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Streetfighter", "VVA Engine", "LED Headlight", "Digital Console"]
    },
    colors: [
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Racing Blue", hexCode: "#0000FF" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 169000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 175000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-03-01'),
    isAvailable: true,
    rating: 4.3,
    reviews: generateReviews("Yamaha MT-15 V2", "Naked", 4.3),
    showroomId: {
      _id: "4",
      name: "Yamaha Showroom - Chennai",
      address: "321 Anna Salai, Chennai",
      contact: { phone: "+91 98765 43213" }
    }
  },
  {
    _id: "7",
    name: "TVS Apache RTR 160",
    brand: "TVS",
    model: "Apache RTR 160",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 121000,
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
    specifications: {
      engine: "159.7 cc",
      power: "16.5 bhp",
      torque: "14.8 Nm",
      mileage: "40-45 kmpl",
      weight: "152 kg",
      dimensions: "2015 x 780 x 1080 mm",
      fuelCapacity: "12 liters",
      transmission: "5-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Sport Commuter", "City Friendly", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#FF0000" },
      { name: "Pearl White", hexCode: "#FFFFFF" },
      { name: "Metallic Black", hexCode: "#000000" }
    ],
    variants: [
      { name: "Standard", price: 121000, features: ["Basic Console", "Standard Colors"] },
      { name: "Race Edition", price: 127000, features: ["Digital Console", "LED Headlight", "Racing Stripes"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-02-01'),
    isAvailable: true,
    rating: 4.4,
    reviews: generateReviews("TVS Apache RTR 160", "Sport", 4.4),
    showroomId: {
      _id: "5",
      name: "TVS Showroom - Kolkata",
      address: "654 Park Street, Kolkata",
      contact: { phone: "+91 98765 43214" }
    }
  },
  {
    _id: "8",
    name: "Yamaha R15 V4",
    brand: "Yamaha",
    model: "R15 V4",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 189000,
    images: getVehicleImages("Yamaha R15 V4", "Metallic Black"),
    specifications: {
      engine: "155 cc",
      power: "18.4 bhp",
      torque: "14.1 Nm",
      mileage: "40-45 kmpl",
      weight: "142 kg",
      dimensions: "2015 x 780 x 1080 mm",
      fuelCapacity: "11 liters",
      transmission: "6-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Fully Faired", "Sporty Handling", "VVA Engine", "LED Headlight"]
    },
    colors: [
      { name: "Racing Blue", hexCode: "#0000FF" },
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 189000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 195000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.5,
    reviews: generateReviews("Yamaha R15 V4", "Sport", 4.5),
    showroomId: {
      _id: "4",
      name: "Yamaha Showroom - Chennai",
      address: "321 Anna Salai, Chennai",
      contact: { phone: "+91 98765 43213" }
    }
  },
  {
    _id: "9",
    name: "Bajaj Pulsar N160",
    brand: "Bajaj",
    model: "Pulsar N160",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 126000,
    images: getVehicleImages("Bajaj Pulsar N160", "Racing Red"),
    specifications: {
      engine: "164.82 cc",
      power: "16 bhp",
      torque: "14.65 Nm",
      mileage: "Up to 50 kmpl",
      weight: "152 kg",
      dimensions: "2055 x 750 x 1165 mm",
      fuelCapacity: "14 liters",
      transmission: "5-speed",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Naked Bike", "Agile City Ride", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#FF0000" },
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 126000, features: ["Basic Console", "Standard Colors"] },
      { name: "Premium", price: 132000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-02-01'),
    isAvailable: true,
    rating: 4.3,
    reviews: generateReviews("Bajaj Pulsar N160", "Naked", 4.3),
    showroomId: {
      _id: "3",
      name: "Bajaj Showroom - Bangalore",
      address: "789 Brigade Road, Bangalore",
      contact: { phone: "+91 98765 43212" }
    }
  },
  {
    _id: "10",
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    model: "Pulsar NS200",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 143000,
    images: getVehicleImages("Yamaha MT-15 V2", "Metallic Black"),
    specifications: {
      engine: "199.5 cc",
      power: "24.5 bhp",
      torque: "18.74 Nm",
      mileage: "30-35 kmpl",
      weight: "157 kg",
      dimensions: "2055 x 750 x 1165 mm",
      fuelCapacity: "12 liters",
      transmission: "6-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Performance Streetfighter", "Digital Console", "LED Headlight", "ABS"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#FF0000" },
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 143000, features: ["Basic Console", "Standard Colors"] },
      { name: "Premium", price: 149000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: false,
    launchDate: new Date('2023-01-01'),
    isAvailable: true,
    rating: 4.4,
    reviews: generateReviews("Bajaj Pulsar NS200", "Naked", 4.4),
    showroomId: {
      _id: "3",
      name: "Bajaj Showroom - Bangalore",
      address: "789 Brigade Road, Bangalore",
      contact: { phone: "+91 98765 43212" }
    }
  },
  {
    _id: "11",
    name: "Honda CB200X",
    brand: "Honda",
    model: "CB200X",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 146000,
    images: getVehicleImages("Yamaha MT-15 V2", "Metallic Black"),
    specifications: {
      engine: "184 cc",
      power: "17.1 bhp",
      torque: "16.1 Nm",
      mileage: "40-45 kmpl",
      weight: "147 kg",
      dimensions: "2015 x 750 x 1095 mm",
      fuelCapacity: "12 liters",
      transmission: "5-speed",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Adventure Styling", "Upright Ride", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Pearl Shining Black", hexCode: "#000000" },
      { name: "Pearl Shining White", hexCode: "#FFFFFF" },
      { name: "Pearl Shining Red", hexCode: "#FF0000" }
    ],
    variants: [
      { name: "Standard", price: 146000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 152000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.3,
    reviews: generateReviews("Honda CB200X", "Adventure", 4.3),
    showroomId: {
      _id: "6",
      name: "Honda Showroom - Mumbai Central",
      address: "123 MG Road, Mumbai",
      contact: { phone: "+91 98765 43210" }
    }
  },
  {
    _id: "12",
    name: "TVS Apache RTR 200 4V",
    brand: "TVS",
    model: "Apache RTR 200 4V",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 146000,
    images: getVehicleImages("TVS Apache RTR 200 4V", "Racing Red"),
    specifications: {
      engine: "197.75 cc",
      power: "20.5 bhp",
      torque: "17.25 Nm",
      mileage: "37 kmpl",
      weight: "153 kg",
      dimensions: "2015 x 780 x 1080 mm",
      fuelCapacity: "12 liters",
      transmission: "5-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Ride Modes", "Sporty Commuter", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#FF0000" },
      { name: "Pearl White", hexCode: "#FFFFFF" },
      { name: "Metallic Black", hexCode: "#000000" }
    ],
    variants: [
      { name: "Standard", price: 146000, features: ["Basic Console", "Standard Colors"] },
      { name: "Race Edition", price: 152000, features: ["Digital Console", "LED Headlight", "Racing Stripes"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-02-01'),
    isAvailable: true,
    rating: 4.4,
    reviews: generateReviews("TVS Apache RTR 200 4V", "Sport", 4.4),
    showroomId: {
      _id: "5",
      name: "TVS Showroom - Kolkata",
      address: "654 Park Street, Kolkata",
      contact: { phone: "+91 98765 43214" }
    }
  },
  {
    _id: "13",
    name: "Hero XPulse 200 4V",
    brand: "Hero",
    model: "XPulse 200 4V",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 145000,
    images: getVehicleImages("Yamaha MT-15 V2", "Metallic Black"),
    specifications: {
      engine: "199.6 cc",
      power: "18.4 bhp",
      torque: "17.35 Nm",
      mileage: "50 kmpl",
      weight: "157 kg",
      dimensions: "2015 x 750 x 1095 mm",
      fuelCapacity: "13 liters",
      transmission: "5-speed",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Spoke",
      features: ["Off-road Capable", "High Ground Clearance", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Black", hexCode: "#000000" },
      { name: "Red", hexCode: "#FF0000" },
      { name: "Blue", hexCode: "#0000FF" }
    ],
    variants: [
      { name: "Standard", price: 145000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 151000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.3,
    reviews: generateReviews("Hero XPulse 200 4V", "Adventure", 4.3),
    showroomId: {
      _id: "7",
      name: "Hero MotoCorp - Chennai",
      address: "321 Anna Salai, Chennai",
      contact: { phone: "+91 98765 43213" }
    }
  },
  {
    _id: "14",
    name: "Yamaha FZ-S FI Hybrid",
    brand: "Yamaha",
    model: "FZ-S FI Hybrid",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol Hybrid",
    price: 144000,
    images: getVehicleImages("Yamaha FZ-S FI Hybrid", "Metallic Black"),
    specifications: {
      engine: "149 cc",
      power: "12.4 bhp",
      torque: "13.6 Nm",
      mileage: "~60 kmpl",
      weight: "137 kg",
      dimensions: "2015 x 780 x 1080 mm",
      fuelCapacity: "13 liters",
      transmission: "5-speed",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Fuel Saving Hybrid Tech", "LED Headlight", "Digital Console", "Muscle Design"]
    },
    colors: [
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Racing Blue", hexCode: "#0000FF" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 144000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 150000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-03-01'),
    isAvailable: true,
    rating: 4.2,
    reviews: generateReviews("Yamaha FZ-S FI Hybrid", "Commuter", 4.2),
    showroomId: {
      _id: "4",
      name: "Yamaha Showroom - Chennai",
      address: "321 Anna Salai, Chennai",
      contact: { phone: "+91 98765 43213" }
    }
  },
  {
    _id: "15",
    name: "Hero Xtreme 250R",
    brand: "Hero",
    model: "Xtreme 250R",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 180000,
    images: getVehicleImages("Yamaha MT-15 V2", "Metallic Black"),
    specifications: {
      engine: "249 cc",
      power: "26.5 bhp",
      torque: "23.5 Nm",
      mileage: "37 kmpl",
      weight: "157 kg",
      dimensions: "2015 x 750 x 1095 mm",
      fuelCapacity: "13 liters",
      transmission: "6-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Sporty", "Mid-range Performance", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Black", hexCode: "#000000" },
      { name: "Red", hexCode: "#FF0000" },
      { name: "Blue", hexCode: "#0000FF" }
    ],
    variants: [
      { name: "Standard", price: 180000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 186000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.4,
    reviews: generateReviews("Hero Xtreme 250R", "Sport", 4.4),
    showroomId: {
      _id: "7",
      name: "Hero MotoCorp - Chennai",
      address: "321 Anna Salai, Chennai",
      contact: { phone: "+91 98765 43213" }
    }
  },
  {
    _id: "16",
    name: "Bajaj Pulsar F250",
    brand: "Bajaj",
    model: "Pulsar F250",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 145000,
    images: getVehicleImages("Yamaha MT-15 V2", "Metallic Black"),
    specifications: {
      engine: "249.07 cc",
      power: "24.5 bhp",
      torque: "21.5 Nm",
      mileage: "40 kmpl",
      weight: "164 kg",
      dimensions: "2055 x 750 x 1165 mm",
      fuelCapacity: "14 liters",
      transmission: "5-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Faired Design", "Highway Ready", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#FF0000" },
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 145000, features: ["Basic Console", "Standard Colors"] },
      { name: "Premium", price: 151000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.3,
    reviews: generateReviews("Bajaj Pulsar F250", "Sport", 4.3),
    showroomId: {
      _id: "3",
      name: "Bajaj Showroom - Bangalore",
      address: "789 Brigade Road, Bangalore",
      contact: { phone: "+91 98765 43212" }
    }
  },
  {
    _id: "17",
    name: "Bajaj Pulsar N250",
    brand: "Bajaj",
    model: "Pulsar N250",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 144000,
    images: getVehicleImages("Bajaj Pulsar N250", "Metallic Black"),
    specifications: {
      engine: "249.07 cc",
      power: "24.5 bhp",
      torque: "21.5 Nm",
      mileage: "45 kmpl",
      weight: "164 kg",
      dimensions: "2055 x 750 x 1165 mm",
      fuelCapacity: "14 liters",
      transmission: "5-speed",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Naked Street Style", "Powerful", "Digital Console", "LED Headlight"]
    },
    colors: [
      { name: "Racing Red", hexCode: "#FF0000" },
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Pearl White", hexCode: "#FFFFFF" }
    ],
    variants: [
      { name: "Standard", price: 144000, features: ["Basic Console", "Standard Colors"] },
      { name: "Premium", price: 150000, features: ["Digital Console", "LED Headlight", "All Colors"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.4,
    reviews: generateReviews("Bajaj Pulsar N250", "Naked", 4.4),
    showroomId: {
      _id: "3",
      name: "Bajaj Showroom - Bangalore",
      address: "789 Brigade Road, Bangalore",
      contact: { phone: "+91 98765 43212" }
    }
  },
  {
    _id: "18",
    name: "TVS iQube (EV)",
    brand: "TVS",
    model: "iQube",
    year: 2024,
    type: "Electric Vehicle",
    fuelType: "Electric",
    price: 117000,
    images: getVehicleImages("TVS iQube (EV)", "Metallic Black"),
    specifications: {
      engine: "3.04 kWh",
      power: "4.4 kW",
      torque: "140 Nm",
      mileage: "145 km/charge",
      weight: "118 kg",
      dimensions: "1860 x 700 x 1150 mm",
      fuelCapacity: "3.04 kWh",
      transmission: "Automatic",
      brakes: "Disc (F), Drum (R)",
      suspension: "Telescopic (F), Unit Swing (R)",
      wheels: "Tubeless",
      features: ["Smart Features", "Silent Ride", "App Connectivity", "Fast Charging"]
    },
    colors: [
      { name: "Pearl White", hexCode: "#FFFFFF" },
      { name: "Metallic Black", hexCode: "#000000" },
      { name: "Racing Red", hexCode: "#FF0000" }
    ],
    variants: [
      { name: "Standard", price: 117000, features: ["Basic Features", "Standard Colors"] },
      { name: "Pro", price: 125000, features: ["All Features", "All Colors", "Premium Finish"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.2,
    reviews: generateReviews("TVS iQube (EV)", "Electric", 4.2),
    showroomId: {
      _id: "5",
      name: "TVS Showroom - Kolkata",
      address: "654 Park Street, Kolkata",
      contact: { phone: "+91 98765 43214" }
    }
  },
  {
    _id: "19",
    name: "Pure EV eTryst 350 (EV)",
    brand: "Pure EV",
    model: "eTryst 350",
    year: 2024,
    type: "Electric Vehicle",
    fuelType: "Electric",
    price: 150000,
    images: getVehicleImages("Pure EV eTryst 350 (EV)", "Electric Blue"),
    specifications: {
      engine: "3.5 kWh",
      power: "3 kW",
      torque: "120 Nm",
      mileage: "140 km/charge",
      weight: "140 kg",
      dimensions: "2000 x 750 x 1200 mm",
      fuelCapacity: "3.5 kWh",
      transmission: "Automatic",
      brakes: "Disc (F&R)",
      suspension: "Telescopic (F), Monoshock (R)",
      wheels: "Tubeless",
      features: ["Electric Motorcycle", "Urban Use", "App Connectivity", "Fast Charging"]
    },
    colors: [
      { name: "Jet Black", hexCode: "#000000" },
      { name: "Porcelain White", hexCode: "#FFFFFF" },
      { name: "Electric Blue", hexCode: "#0066CC" }
    ],
    variants: [
      { name: "Standard", price: 150000, features: ["Basic Features", "Standard Colors"] },
      { name: "Pro", price: 160000, features: ["All Features", "All Colors", "Premium Finish"] }
    ],
    isNewLaunch: true,
    launchDate: new Date('2024-01-01'),
    isAvailable: true,
    rating: 4.1,
    reviews: generateReviews("Pure EV eTryst 350 (EV)", "Electric", 4.1),
    showroomId: {
      _id: "8",
      name: "Pure EV Showroom - Ahmedabad",
      address: "258 CG Road, Ahmedabad",
      contact: { phone: "+91 98765 43217" }
    }
  },
  {
    _id: "20",
    name: "Hero Glamour",
    brand: "Hero",
    model: "Glamour",
    year: 2024,
    type: "Bike",
    fuelType: "Petrol",
    price: 83000,
    images: getVehicleImages("Hero Glamour", "Black"),
    specifications: {
      engine: "124.7 cc",
      power: "10.6 bhp",
      torque: "10.3 Nm",
      mileage: "~60 kmpl",
      weight: "126 kg",
      dimensions: "2015 x 750 x 1095 mm",
      fuelCapacity: "10.5 liters",
      transmission: "5-speed",
      brakes: "Drum (F&R)",
      suspension: "Telescopic (F), Swing Arm (R)",
      wheels: "Spoke",
      features: ["Budget Commuter", "Low Running Cost", "Electric Start", "Digital Console"]
    },
    colors: [
      { name: "Black", hexCode: "#000000" },
      { name: "Red", hexCode: "#FF0000" },
      { name: "Blue", hexCode: "#0000FF" }
    ],
    variants: [
      { name: "Standard", price: 83000, features: ["Basic Console", "Standard Colors"] },
      { name: "Deluxe", price: 86000, features: ["Digital Console", "All Colors"] }
    ],
    isNewLaunch: false,
    launchDate: new Date('2023-01-01'),
    isAvailable: true,
    rating: 4.0,
    reviews: generateReviews("Hero Glamour", "Commuter", 4.0),
    showroomId: {
      _id: "7",
      name: "Hero MotoCorp - Chennai",
      address: "321 Anna Salai, Chennai",
      contact: { phone: "+91 98765 43213" }
    }
  }
];

// Mock showrooms data - Comprehensive list for major cities
const mockShowrooms = [
  // MUMBAI SHOWROOMS (4+)
  {
    _id: "1",
    name: "Royal Enfield Showroom - Bandra",
    address: "123 MG Road, Bandra West, Mumbai, Maharashtra 400050",
    contact: {
      phone: "+91 98765 43210",
      email: "bandra@royalenfield.com"
    },
    location: {
      latitude: 19.0544,
      longitude: 72.8406
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Royal Enfield"],
    rating: 4.5,
    reviews: 156,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "2",
    name: "Bajaj Showroom - Andheri",
    address: "456 Link Road, Andheri West, Mumbai, Maharashtra 400058",
    contact: {
      phone: "+91 98765 43211",
      email: "andheri@bajajauto.com"
    },
    location: {
      latitude: 19.1136,
      longitude: 72.8697
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Bajaj"],
    rating: 4.3,
    reviews: 134,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "3",
    name: "Honda Showroom - Powai",
    address: "789 Powai Lake Road, Powai, Mumbai, Maharashtra 400076",
    contact: {
      phone: "+91 98765 43212",
      email: "powai@honda2wheelers.com"
    },
    location: {
      latitude: 19.1176,
      longitude: 72.9060
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Honda"],
    rating: 4.4,
    reviews: 142,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "4",
    name: "TVS Showroom - Thane",
    address: "321 Ghodbunder Road, Thane West, Mumbai, Maharashtra 400615",
    contact: {
      phone: "+91 98765 43213",
      email: "thane@tvsmotor.com"
    },
    location: {
      latitude: 19.2183,
      longitude: 72.9781
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["TVS"],
    rating: 4.2,
    reviews: 128,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "5",
    name: "Yamaha Showroom - Malad",
    address: "654 Link Road, Malad West, Mumbai, Maharashtra 400064",
    contact: {
      phone: "+91 98765 43214",
      email: "malad@yamaha-motor.com"
    },
    location: {
      latitude: 19.1868,
      longitude: 72.8486
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Yamaha"],
    rating: 4.6,
    reviews: 167,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  
  // DELHI SHOWROOMS (4+)
  {
    _id: "6",
    name: "KTM Showroom - Karol Bagh",
    address: "456 Karol Bagh, New Delhi, Delhi 110005",
    contact: {
      phone: "+91 98765 43215",
      email: "karolbagh@ktm.com"
    },
    location: {
      latitude: 28.6517,
      longitude: 77.1909
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Racing Gear"],
    brands: ["KTM"],
    rating: 4.3,
    reviews: 89,
    timings: "10:00 AM - 7:00 PM",
    features: ["Performance Tuning", "Racing Accessories", "EMI Options", "Insurance"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "3",
    name: "Bajaj Showroom - Bangalore",
    address: "789 Outer Ring Road, Marathahalli, Bangalore, Karnataka 560037",
    contact: {
      phone: "+91 98765 43212",
      email: "bangalore@bajajauto.com"
    },
    location: {
      latitude: 12.9716,
      longitude: 77.5946
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Finance"],
    brands: ["Bajaj"],
    rating: 4.4,
    reviews: 203,
    timings: "9:30 AM - 8:30 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "4",
    name: "Yamaha Showroom - Chennai",
    address: "101 Anna Salai, T. Nagar, Chennai, Tamil Nadu 600017",
    contact: {
      phone: "+91 98765 43213",
      email: "chennai@yamaha-motor.com"
    },
    location: {
      latitude: 13.0418,
      longitude: 80.2341
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Racing Academy"],
    brands: ["Yamaha"],
    rating: 4.6,
    reviews: 178,
    timings: "9:00 AM - 8:00 PM",
    features: ["Racing Academy", "Performance Parts", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "5",
    name: "TVS Showroom - Hyderabad",
    address: "202 Gachibowli, Financial District, Hyderabad, Telangana 500032",
    contact: {
      phone: "+91 98765 43214",
      email: "hyderabad@tvsmotor.com"
    },
    location: {
      latitude: 17.4399,
      longitude: 78.3481
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Electric Vehicles"],
    brands: ["TVS"],
    rating: 4.2,
    reviews: 134,
    timings: "9:00 AM - 7:30 PM",
    features: ["Electric Vehicle Support", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "6",
    name: "Honda Showroom - Pune",
    address: "303 FC Road, Deccan Gymkhana, Pune, Maharashtra 411004",
    contact: {
      phone: "+91 98765 43215",
      email: "pune@honda2wheelers.com"
    },
    location: {
      latitude: 18.5204,
      longitude: 73.8567
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Riding School"],
    brands: ["Honda"],
    rating: 4.7,
    reviews: 267,
    timings: "9:00 AM - 8:00 PM",
    features: ["Riding School", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "7",
    name: "Hero MotoCorp - Kolkata",
    address: "404 Park Street, Kolkata, West Bengal 700016",
    contact: {
      phone: "+91 98765 43216",
      email: "kolkata@heromotocorp.com"
    },
    location: {
      latitude: 22.5726,
      longitude: 88.3639
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Electric Vehicles"],
    brands: ["Hero"],
    rating: 4.1,
    reviews: 189,
    timings: "9:30 AM - 8:00 PM",
    features: ["Electric Vehicle Support", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "8",
    name: "Pure EV Showroom - Jaipur",
    address: "505 MI Road, C-Scheme, Jaipur, Rajasthan 302001",
    contact: {
      phone: "+91 98765 43217",
      email: "jaipur@pureev.com"
    },
    location: {
      latitude: 26.9124,
      longitude: 75.7873
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Charging Station"],
    brands: ["Pure EV"],
    rating: 4.0,
    reviews: 67,
    timings: "10:00 AM - 7:00 PM",
    features: ["Charging Station", "EMI Options", "Insurance", "Exchange", "Electric Support"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "9",
    name: "Suzuki Showroom - Ahmedabad",
    address: "606 CG Road, Ahmedabad, Gujarat 380006",
    contact: {
      phone: "+91 98765 43218",
      email: "ahmedabad@suzukimotorcycle.com"
    },
    location: {
      latitude: 23.0225,
      longitude: 72.5714
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Racing Gear"],
    brands: ["Suzuki"],
    rating: 4.3,
    reviews: 145,
    timings: "9:00 AM - 8:00 PM",
    features: ["Racing Accessories", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "10",
    name: "Jawa Showroom - Chandigarh",
    address: "707 Sector 17, Chandigarh, Punjab 160017",
    contact: {
      phone: "+91 98765 43219",
      email: "chandigarh@jawa.com"
    },
    location: {
      latitude: 30.7333,
      longitude: 76.7794
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Customization"],
    brands: ["Jawa"],
    rating: 4.4,
    reviews: 98,
    timings: "9:30 AM - 7:30 PM",
    features: ["Customization", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "11",
    name: "Benelli Showroom - Kochi",
    address: "808 MG Road, Kochi, Kerala 682016",
    contact: {
      phone: "+91 98765 43220",
      email: "kochi@benelli.com"
    },
    location: {
      latitude: 9.9312,
      longitude: 76.2673
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Premium Service"],
    brands: ["Benelli"],
    rating: 4.5,
    reviews: 76,
    timings: "10:00 AM - 8:00 PM",
    features: ["Premium Service", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "12",
    name: "Ducati Showroom - Gurgaon",
    address: "909 Cyber City, Gurgaon, Haryana 122002",
    contact: {
      phone: "+91 98765 43221",
      email: "gurgaon@ducati.com"
    },
    location: {
      latitude: 28.4595,
      longitude: 77.0266
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Racing Academy"],
    brands: ["Ducati"],
    rating: 4.8,
    reviews: 234,
    timings: "10:00 AM - 8:00 PM",
    features: ["Racing Academy", "Premium Service", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "13",
    name: "Triumph Showroom - Mumbai",
    address: "1010 Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    contact: {
      phone: "+91 98765 43222",
      email: "mumbai@triumphmotorcycles.com"
    },
    location: {
      latitude: 19.0544,
      longitude: 72.8406
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Customization"],
    brands: ["Triumph"],
    rating: 4.6,
    reviews: 156,
    timings: "10:00 AM - 8:00 PM",
    features: ["Customization", "Premium Service", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "14",
    name: "Harley Davidson Showroom - Delhi",
    address: "1111 Connaught Place, New Delhi, Delhi 110001",
    contact: {
      phone: "+91 98765 43223",
      email: "delhi@harley-davidson.com"
    },
    location: {
      latitude: 28.6315,
      longitude: 77.2167
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Riding Academy"],
    brands: ["Harley Davidson"],
    rating: 4.7,
    reviews: 189,
    timings: "10:00 AM - 8:00 PM",
    features: ["Riding Academy", "Customization", "Premium Service", "EMI Options", "Insurance"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "15",
    name: "BMW Motorrad Showroom - Bangalore",
    address: "1212 Brigade Road, Bangalore, Karnataka 560001",
    contact: {
      phone: "+91 98765 43224",
      email: "bangalore@bmw-motorrad.com"
    },
    location: {
      latitude: 12.9716,
      longitude: 77.5946
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive", "Premium Service"],
    brands: ["BMW Motorrad"],
    rating: 4.8,
    reviews: 167,
    timings: "10:00 AM - 8:00 PM",
    features: ["Premium Service", "EMI Options", "Insurance", "Exchange", "Service Center"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  
  // ADDITIONAL SHOWROOMS FOR COMPREHENSIVE COVERAGE
  
  // MUMBAI ADDITIONAL SHOWROOMS
  {
    _id: "16",
    name: "Hero Showroom - Goregaon",
    address: "555 Link Road, Goregaon West, Mumbai, Maharashtra 400062",
    contact: {
      phone: "+91 98765 43225",
      email: "goregaon@heromotocorp.com"
    },
    location: {
      latitude: 19.1598,
      longitude: 72.8565
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Hero"],
    rating: 4.3,
    reviews: 145,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "17",
    name: "Suzuki Showroom - Vashi",
    address: "777 Palm Beach Road, Vashi, Navi Mumbai, Maharashtra 400703",
    contact: {
      phone: "+91 98765 43226",
      email: "vashi@suzukimotorcycle.com"
    },
    location: {
      latitude: 19.0754,
      longitude: 72.9982
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Suzuki"],
    rating: 4.4,
    reviews: 132,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  
  // DELHI ADDITIONAL SHOWROOMS
  {
    _id: "18",
    name: "Hero Showroom - Pitampura",
    address: "888 Pitampura, New Delhi, Delhi 110034",
    contact: {
      phone: "+91 98765 43227",
      email: "pitampura@heromotocorp.com"
    },
    location: {
      latitude: 28.6980,
      longitude: 77.1300
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Hero"],
    rating: 4.2,
    reviews: 156,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "19",
    name: "Suzuki Showroom - Saket",
    address: "999 Saket District Centre, New Delhi, Delhi 110017",
    contact: {
      phone: "+91 98765 43228",
      email: "saket@suzukimotorcycle.com"
    },
    location: {
      latitude: 28.5304,
      longitude: 77.2177
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Suzuki"],
    rating: 4.5,
    reviews: 143,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  
  // BANGALORE ADDITIONAL SHOWROOMS
  {
    _id: "20",
    name: "Hero Showroom - Electronic City",
    address: "111 Electronic City Phase 1, Bangalore, Karnataka 560100",
    contact: {
      phone: "+91 98765 43229",
      email: "electroniccity@heromotocorp.com"
    },
    location: {
      latitude: 12.8456,
      longitude: 77.6603
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Hero"],
    rating: 4.4,
    reviews: 167,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "21",
    name: "Suzuki Showroom - Whitefield",
    address: "222 Whitefield Main Road, Bangalore, Karnataka 560066",
    contact: {
      phone: "+91 98765 43230",
      email: "whitefield@suzukimotorcycle.com"
    },
    location: {
      latitude: 12.9698,
      longitude: 77.7500
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Suzuki"],
    rating: 4.3,
    reviews: 134,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  
  // CHENNAI ADDITIONAL SHOWROOMS
  {
    _id: "22",
    name: "Hero Showroom - Anna Nagar",
    address: "333 Anna Nagar Main Road, Chennai, Tamil Nadu 600040",
    contact: {
      phone: "+91 98765 43231",
      email: "annanagar@heromotocorp.com"
    },
    location: {
      latitude: 13.0827,
      longitude: 80.2707
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Hero"],
    rating: 4.5,
    reviews: 189,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "23",
    name: "Suzuki Showroom - Velachery",
    address: "444 Velachery Main Road, Chennai, Tamil Nadu 600042",
    contact: {
      phone: "+91 98765 43232",
      email: "velachery@suzukimotorcycle.com"
    },
    location: {
      latitude: 12.9816,
      longitude: 80.2206
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Suzuki"],
    rating: 4.4,
    reviews: 156,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  
  // HYDERABAD SHOWROOMS
  {
    _id: "24",
    name: "Royal Enfield Showroom - Banjara Hills",
    address: "555 Banjara Hills, Hyderabad, Telangana 500034",
    contact: {
      phone: "+91 98765 43233",
      email: "banjarahills@royalenfield.com"
    },
    location: {
      latitude: 17.4065,
      longitude: 78.4772
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Royal Enfield"],
    rating: 4.6,
    reviews: 178,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "25",
    name: "Bajaj Showroom - Secunderabad",
    address: "666 Secunderabad, Hyderabad, Telangana 500003",
    contact: {
      phone: "+91 98765 43234",
      email: "secunderabad@bajajauto.com"
    },
    location: {
      latitude: 17.4399,
      longitude: 78.4983
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Bajaj"],
    rating: 4.3,
    reviews: 145,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "26",
    name: "Honda Showroom - Gachibowli",
    address: "777 Gachibowli, Hyderabad, Telangana 500032",
    contact: {
      phone: "+91 98765 43235",
      email: "gachibowli@honda2wheelers.com"
    },
    location: {
      latitude: 17.4399,
      longitude: 78.3484
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Honda"],
    rating: 4.5,
    reviews: 167,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "27",
    name: "TVS Showroom - HITEC City",
    address: "888 HITEC City, Hyderabad, Telangana 500081",
    contact: {
      phone: "+91 98765 43236",
      email: "hiteccity@tvsmotor.com"
    },
    location: {
      latitude: 17.4399,
      longitude: 78.3484
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["TVS"],
    rating: 4.4,
    reviews: 134,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  
  // PUNE SHOWROOMS
  {
    _id: "28",
    name: "Royal Enfield Showroom - Koregaon Park",
    address: "999 Koregaon Park, Pune, Maharashtra 411001",
    contact: {
      phone: "+91 98765 43237",
      email: "koregaonpark@royalenfield.com"
    },
    location: {
      latitude: 18.5358,
      longitude: 73.8903
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Royal Enfield"],
    rating: 4.7,
    reviews: 189,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "29",
    name: "Bajaj Showroom - Hinjewadi",
    address: "111 Hinjewadi IT Park, Pune, Maharashtra 411057",
    contact: {
      phone: "+91 98765 43238",
      email: "hinjewadi@bajajauto.com"
    },
    location: {
      latitude: 18.5917,
      longitude: 73.7389
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Bajaj"],
    rating: 4.4,
    reviews: 156,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "30",
    name: "Honda Showroom - Viman Nagar",
    address: "222 Viman Nagar, Pune, Maharashtra 411014",
    contact: {
      phone: "+91 98765 43239",
      email: "vimanagar@honda2wheelers.com"
    },
    location: {
      latitude: 18.5679,
      longitude: 73.9142
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["Honda"],
    rating: 4.5,
    reviews: 167,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  },
  {
    _id: "31",
    name: "TVS Showroom - Baner",
    address: "333 Baner Road, Pune, Maharashtra 411045",
    contact: {
      phone: "+91 98765 43240",
      email: "baner@tvsmotor.com"
    },
    location: {
      latitude: 18.5596,
      longitude: 73.7804
    },
    services: ["Sales", "Service", "Spare Parts", "Test Drive"],
    brands: ["TVS"],
    rating: 4.3,
    reviews: 134,
    timings: "9:00 AM - 8:00 PM",
    features: ["Free Test Drive", "EMI Options", "Insurance", "Exchange"],
    images: getVehicleImages("TVS Apache RTR 160", "Racing Red"),
  }
];

// Set isUsed: false for all original bikes
mockVehicles.forEach(bike => {
  if (bike.isUsed === undefined) {
    bike.isUsed = false;
  }
});

// Generate used bikes from existing bikes
const usedBikes = [];

// Create used variants for popular bikes
const popularBikes = mockVehicles.slice(0, 12); // Take first 12 bikes for used variants

popularBikes.forEach((bike, index) => {
  // Create 2-3 used variants per bike with different conditions
  const conditions = ['excellent', 'good', 'fair'];
  const years = [2022, 2021, 2020];
  const mileages = ['5,000-15,000 km', '15,000-30,000 km', '30,000-50,000 km'];
  const priceReductions = [0.15, 0.25, 0.35]; // 15%, 25%, 35% off
  
  // Create 2 used variants per bike
  for (let i = 0; i < 2; i++) {
    const condition = conditions[i];
    const year = years[i];
    const mileage = mileages[i];
    const priceReduction = priceReductions[i];
    
    usedBikes.push(createUsedBike(bike, condition, year, mileage, priceReduction));
  }
});

// Combine new and used bikes
const allVehicles = [...mockVehicles, ...usedBikes];

module.exports = { mockVehicles: allVehicles, mockShowrooms };
