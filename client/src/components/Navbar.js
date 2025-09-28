import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useWishlist } from '../contexts/WishlistContext';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUser, FaHeart, FaMotorcycle, FaRocket, FaStar, FaMapMarkerAlt, FaPhone, FaCalculator, FaBalanceScale } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const NavbarContainer = styled.nav`
  width: 100%;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(15, 23, 42, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'};
  box-shadow: 0 4px 20px ${props => props.theme === 'dark' 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(0, 0, 0, 0.08)'};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' 
      ? 'rgba(15, 23, 42, 0.98)' 
      : 'rgba(255, 255, 255, 0.98)'};
    box-shadow: 0 6px 25px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(0, 0, 0, 0.12)'};
  }
`;

const NavContent = styled.div`
  width: 100%;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: relative;
  
  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    height: 70px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 900;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    gap: 0.4rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex: 1;
  justify-content: center;
  margin: 0 2rem;

  @media (max-width: 1024px) {
    gap: 2rem;
    margin: 0 1.5rem;
  }

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    gap: 1.5rem;
    margin: 0;
    z-index: 1000;
  }
`;

const NavLink = styled(Link)`
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #059669;
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.75rem 0;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #e5e7eb;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: #4b5563;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  &:hover {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    color: #3b82f6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4b5563;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f3f4f6;
    color: #3b82f6;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledButton = styled.button`
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border: 2px solid #d1d5db;
  color: #4b5563;
  padding: 0.7rem 1.4rem;
  border-radius: 0.7rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-color: #10b981;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const StyledLink = styled(Link)`
  padding: 0.7rem 1.4rem;
  border-radius: 0.7rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${props => props.variant === 'outline' ? `
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border: 2px solid #d1d5db;
    color: #4b5563;

    &:hover {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border-color: #10b981;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  ` : `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border: 2px solid transparent;
    color: white;

    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
  `}

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarContainer theme={theme}>
      <NavContent>
        <Logo to="/">
          ⚡ Moto Matrix
        </Logo>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/vehicles">
            <FaMotorcycle />
            Browse Vehicles
          </NavLink>
          <NavLink to="/used-bikes">
            <FaMotorcycle />
            Used Bikes
          </NavLink>
          <NavLink to="/sell-bike">
            <FaRocket />
            Sell Bike
          </NavLink>
          <NavLink to="/new-launches">
            <FaStar />
            New Launches
          </NavLink>
          <NavLink to="/showrooms">
            <FaMapMarkerAlt />
            Showrooms
          </NavLink>
          <NavLink to="/contact">
            <FaPhone />
            Contact
          </NavLink>
          <NavLink to="/calculators">
            <FaCalculator />
            Calculators
          </NavLink>
          <NavLink to="/compare">
            <FaBalanceScale />
            Compare
          </NavLink>
        </NavLinks>

        <UserActions>
          <ThemeToggle />
          <StyledLink to="/wishlist" variant="outline" style={{ position: 'relative' }}>
            <FaHeart />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {wishlistCount}
              </span>
            )}
          </StyledLink>
          {isAuthenticated ? (
            <>
              <UserButton onClick={() => navigate('/profile')}>
                <FaUser />
              </UserButton>
              <StyledButton onClick={handleLogout}>
                Logout
              </StyledButton>
            </>
          ) : (
            <>
              <StyledLink to="/login" variant="outline">
                Login
              </StyledLink>
              <StyledLink to="/register" variant="primary">
                Register
              </StyledLink>
            </>
          )}
        </UserActions>

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
