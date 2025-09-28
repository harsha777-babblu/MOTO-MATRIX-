# 🚀 Quick Setup Guide - Moto Matrix Marketplace

## ⚡ Super Quick Start (5 minutes)

### 1. Prerequisites
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- MongoDB (local or cloud) - [Download here](https://www.mongodb.com/try/download/community)

### 2. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd moto-matrix-marketplace

# Install all dependencies (this will take a few minutes)
npm run install-all
```

### 3. Setup Database
```bash
# Start MongoDB (if running locally)
# On Windows: Start MongoDB service
# On Mac: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Seed the database with sample data
npm run seed
```

### 4. Start the Application
```bash
# Start both frontend and backend
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 What You'll See

1. **Home Page**: Beautiful landing page with featured vehicles
2. **Vehicle Browsing**: Browse vehicles with search and filters
3. **Vehicle Details**: Detailed vehicle specifications and images
4. **Comparison Tool**: Compare up to 4 vehicles side by side
5. **Calculators**: EMI and fuel cost calculators
6. **Authentication**: Login and registration system

## 📊 Sample Data Included

The seeder creates:
- **6 Sample Vehicles**: Honda Activa, Bajaj Pulsar, TVS iQube, Hero Splendor, Yamaha R15, Royal Enfield Classic
- **2 Sample Showrooms**: Honda Mumbai, Bajaj Delhi
- **Complete Specifications**: Engine, power, mileage, features, colors, variants
- **Reviews and Ratings**: Sample customer reviews

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
# Windows: Check Services
# Mac: brew services list | grep mongodb
# Linux: sudo systemctl status mongod

# If MongoDB is not running, start it:
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# If port 3000 or 5000 is in use, kill the process:
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm run install-all
```

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `client/build` folder
3. Set environment variables

### Backend (Heroku/Railway)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy server directory

## 📱 Features Overview

### ✅ Implemented
- Vehicle browsing with search and filters
- Detailed vehicle pages with specifications
- Vehicle comparison tool
- EMI and fuel cost calculators
- User authentication (login/register)
- Responsive design
- Modern UI with animations

### 🚧 Coming Soon
- Test ride booking system
- Showroom locator with maps
- User profile management
- Wishlist functionality
- Real-time chat with dealers

## 🆘 Need Help?

1. Check the main [README.md](README.md) for detailed documentation
2. Create an issue in the repository
3. Contact: info@motomatrix.com

---

**Happy Coding! 🏍️✨**
