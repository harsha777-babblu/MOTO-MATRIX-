# 🚀 Moto Matrix - Setup Instructions

## 📋 Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

## 🛠️ Quick Setup (Recommended)

### Step 1: Install Dependencies
```bash
# Install all dependencies for root, server, and client
npm run install-all
```

### Step 2: Start the Application
```bash
# Start both frontend and backend simultaneously
npm run dev
```

This will start:
- **Backend Server**: http://localhost:5000
- **Frontend React App**: http://localhost:3000

## 📁 Manual Setup (Alternative)

If you prefer to set up manually:

### Step 1: Install Root Dependencies
```bash
npm install
```

### Step 2: Install Server Dependencies
```bash
cd server
npm install
cd ..
```

### Step 3: Install Client Dependencies
```bash
cd client
npm install
cd ..
```

### Step 4: Start Backend Server
```bash
cd server
npm run dev
```

### Step 5: Start Frontend (in a new terminal)
```bash
cd client
npm start
```

## 🌐 Access the Application

Once everything is running:

1. **Frontend (React App)**: http://localhost:3000
2. **Backend API**: http://localhost:5000
3. **API Documentation**: http://localhost:5000/api/vehicles

## 🔧 Available Scripts

### Root Level Commands
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start only backend server
npm run client       # Start only frontend client
npm run build        # Build frontend for production
npm run install-all  # Install all dependencies
npm run seed         # Seed database with sample data
npm start            # Start production server
npm run setup        # Complete setup (install + seed)
```

### Server Commands
```bash
cd server
npm run dev          # Start server with nodemon
npm start            # Start server normally
npm run seed         # Seed database
```

### Client Commands
```bash
cd client
npm start            # Start React development server
npm run build        # Build for production
npm test             # Run tests
```

## 🗄️ Database Information

The project uses **mock data** for demonstration purposes:
- No MongoDB setup required
- All data is stored in memory
- Data resets when server restarts
- Perfect for development and testing

## 📱 Features Available

### 🏍️ Vehicle Features
- Browse 12+ vehicles (bikes, scooters, EVs)
- Filter by brand, type, fuel type, price
- View detailed specifications
- Compare vehicles
- EMI and fuel cost calculators

### 🏢 Showroom Features
- 16 showrooms across major Indian cities
- Interactive map with GPS coordinates
- Filter by city, brand, services
- Contact information and ratings
- Real-time location services

### 👤 User Features
- User registration and login
- Profile management
- Test ride booking
- Contact forms

## 🚨 Troubleshooting

### Port Already in Use
If you get "port already in use" errors:

```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000
npx kill-port 5000

# Then restart
npm run dev
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
rm -rf server/node_modules
rm -rf client/node_modules
npm run install-all
```

### Windows PowerShell Issues
If you're using PowerShell and get execution policy errors:
```bash
# Set execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🌟 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Deploy the server folder
# Make sure to set NODE_ENV=production
```

## 📞 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify Node.js version (14+)
4. Check if ports 3000 and 5000 are available

## 🎯 Quick Start Checklist

- [ ] Node.js installed (14+)
- [ ] Run `npm run install-all`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Enjoy exploring Moto Matrix! 🏍️

---

**Happy Coding! 🚀**
