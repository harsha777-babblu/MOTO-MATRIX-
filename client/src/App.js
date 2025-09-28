import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import Compare from './pages/Compare';
import Showrooms from './pages/Showrooms';
import BookTestRide from './pages/BookTestRide';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Calculators from './pages/Calculators';
import NewLaunches from './pages/NewLaunches';
import Contact from './pages/Contact';
import SellBike from './pages/SellBike';
import Wishlist from './pages/Wishlist';
import BuyBike from './pages/BuyBike';
import UsedBikes from './pages/UsedBikes';

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <AuthProvider>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/used-bikes" element={<UsedBikes />} />
                <Route path="/vehicles/:id" element={<VehicleDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/showrooms" element={<Showrooms />} />
                <Route path="/book-test-ride" element={<BookTestRide />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/calculators" element={<Calculators />} />
                <Route path="/new-launches" element={<NewLaunches />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sell-bike" element={<SellBike />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/buy-bike" element={<BuyBike />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
