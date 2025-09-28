# 🏍️ Moto Matrix - Two-Wheeler Marketplace

A comprehensive two-wheeler marketplace web application built with React and Node.js, designed for buying and selling bikes, scooters, and electric vehicles.

## 🚀 Features

### Core Functionality
- **Vehicle Browsing**: Browse thousands of vehicles with advanced search and filtering
- **Detailed Vehicle Pages**: Comprehensive vehicle specifications, images, and reviews
- **Vehicle Comparison**: Compare up to 4 vehicles side by side
- **Smart Calculators**: EMI calculator and fuel cost calculator
- **Test Ride Booking**: Book test rides at nearby showrooms
- **Showroom Locator**: Find authorized showrooms with map integration
- **User Authentication**: Secure login and registration system
- **Wishlist**: Save favorite vehicles for later
- **New Launches**: Stay updated with the latest vehicle launches

### Technical Features
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Real-time Search**: Instant search with filters and sorting
- **Image Gallery**: High-quality vehicle images with zoom functionality
- **Rating & Reviews**: Customer reviews and ratings system
- **Price Comparison**: Compare prices across different variants
- **Specification Comparison**: Detailed technical specifications
- **Modern UI**: Built with styled-components and Framer Motion animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Express Validator** - Input validation

### Development Tools
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-restart server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moto-matrix-marketplace
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000

### 🎯 One-Command Setup
```bash
npm run setup  # Installs dependencies and seeds data
npm run dev    # Starts the application
```

### 📱 Features Available
- **12+ Vehicles** with detailed specifications
- **16 Showrooms** across major Indian cities
- **Interactive Maps** with GPS coordinates
- **Advanced Filtering** and search
- **EMI Calculator** and fuel cost calculator
- **Test Ride Booking** system
- **User Authentication** and profiles

### 🗄️ Database Information
The project uses **mock data** for demonstration:
- No MongoDB setup required
- All data is stored in memory
- Perfect for development and testing

## 🗂️ Project Structure

```
moto-matrix-marketplace/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── styles/        # Global styles
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🚀 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-all` - Install dependencies for all packages
- `npm run build` - Build the frontend for production

### Frontend (client/)
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Backend (server/)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Vehicles
- `GET /api/vehicles` - Get all vehicles with filtering
- `GET /api/vehicles/:id` - Get vehicle by ID
- `GET /api/vehicles/popular` - Get popular vehicles
- `GET /api/vehicles/launches/new` - Get new launches
- `POST /api/vehicles/compare` - Compare vehicles
- `POST /api/vehicles/:id/reviews` - Add review

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `PATCH /api/bookings/:id/status` - Update booking status

### Showrooms
- `GET /api/showrooms` - Get all showrooms
- `GET /api/showrooms/:id` - Get showroom by ID
- `GET /api/showrooms/nearby/:lat/:lng` - Find nearby showrooms

### Users
- `GET /api/users/:id` - Get user profile
- `POST /api/users/:id/wishlist` - Add to wishlist
- `DELETE /api/users/:id/wishlist/:vehicleId` - Remove from wishlist
- `PATCH /api/users/:id/preferences` - Update preferences

## 🎨 UI Components

### Core Components
- **Navbar** - Navigation with user authentication
- **Footer** - Site footer with links and contact info
- **VehicleCard** - Vehicle display card with actions
- **SearchBar** - Advanced search with filters
- **FilterPanel** - Vehicle filtering options
- **Pagination** - Page navigation
- **LoadingSpinner** - Loading states
- **Modal** - Reusable modal component

### Pages
- **Home** - Landing page with hero section and featured vehicles
- **Vehicles** - Vehicle listing with search and filters
- **VehicleDetail** - Detailed vehicle view with specifications
- **Compare** - Vehicle comparison tool
- **Calculators** - EMI and fuel cost calculators
- **Showrooms** - Showroom locator (coming soon)
- **BookTestRide** - Test ride booking (coming soon)
- **Profile** - User profile management (coming soon)
- **Login/Register** - Authentication pages

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/moto-matrix
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### Database Schema

#### Vehicle Model
```javascript
{
  name: String,
  brand: String,
  model: String,
  year: Number,
  type: String, // Bike, Scooter, Electric Vehicle
  fuelType: String, // Petrol, Electric, Hybrid
  price: Number,
  images: [String],
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
  isNewLaunch: Boolean,
  launchDate: Date,
  isAvailable: Boolean,
  showroomId: ObjectId,
  rating: Number,
  reviews: [{
    userId: ObjectId,
    rating: Number,
    comment: String,
    date: Date
  }]
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `client/build` folder
3. Set environment variables for API URL

### Backend Deployment (Heroku/Railway)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy the server directory
4. Update frontend API URLs

### Full Stack Deployment
1. Use platforms like Railway, Render, or DigitalOcean
2. Set up MongoDB Atlas for database
3. Configure environment variables
4. Deploy both frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: info@motomatrix.com
- Documentation: [Link to docs]

## 🎯 Future Enhancements

- [ ] Real-time chat with dealers
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered vehicle recommendations
- [ ] Integration with insurance providers
- [ ] Vehicle history reports
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA) features

---

**Built with ❤️ for the Moto Matrix team**
