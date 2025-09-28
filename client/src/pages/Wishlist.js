import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash, FaEye, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useWishlist } from '../contexts/WishlistContext';
import { useTheme } from '../contexts/ThemeContext';
import VehicleCard from '../components/VehicleCard';

const WishlistContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--rainbow-gradient);
  background-size: 200% 200%;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  animation: gradientShift 3s ease infinite;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    animation: gradientShift 1s ease infinite;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--rainbow-gradient);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#64748b'};
  margin-bottom: 2rem;
`;

const WishlistCount = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 2px solid rgba(255, 107, 107, 0.3);
  border-radius: 50px;
  color: #ff6b6b;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  background: var(--rainbow-gradient);
  background-size: 200% 200%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  animation: gradientShift 3s ease infinite;
`;

const EmptyTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
`;

const EmptyDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#64748b'};
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const BrowseButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--rainbow-gradient);
  background-size: 200% 200%;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  animation: gradientShift 3s ease infinite;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
    animation: gradientShift 1s ease infinite;
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const WishlistItem = styled(motion.div)`
  position: relative;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--rainbow-gradient);
    background-size: 200% 100%;
    animation: gradientShift 3s ease infinite;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &.view {
    background: linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
    }
  }
  
  &.remove {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    }
  }
`;

const ClearAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  }
`;

const Wishlist = () => {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlist();
  const { theme } = useTheme();

  if (wishlist.length === 0) {
    return (
      <WishlistContainer theme={theme}>
        <Container>
          <Header>
            <BackButton to="/">
              <FaArrowLeft />
              Back to Home
            </BackButton>
            <Title>My Wishlist</Title>
            <Subtitle theme={theme}>Your favorite bikes are saved here</Subtitle>
          </Header>
          
          <EmptyState
            theme={theme}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <EmptyIcon>
              <FaHeart />
            </EmptyIcon>
            <EmptyTitle theme={theme}>Your wishlist is empty</EmptyTitle>
            <EmptyDescription theme={theme}>
              Start exploring our amazing collection of bikes and add your favorites to your wishlist!
            </EmptyDescription>
            <BrowseButton to="/vehicles">
              <FaShoppingCart />
              Browse Vehicles
            </BrowseButton>
          </EmptyState>
        </Container>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer theme={theme}>
      <Container>
        <Header>
          <BackButton to="/">
            <FaArrowLeft />
            Back to Home
          </BackButton>
          <Title>My Wishlist</Title>
          <Subtitle theme={theme}>Your favorite bikes are saved here</Subtitle>
          <WishlistCount>
            <FaHeart />
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </WishlistCount>
        </Header>
        
        <WishlistGrid>
          {wishlist.map((vehicle, index) => (
            <WishlistItem
              key={vehicle._id}
              theme={theme}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <VehicleCard vehicle={vehicle} />
              <Actions>
                <ActionButton 
                  className="view"
                  as={Link}
                  to={`/vehicles/${vehicle._id}`}
                >
                  <FaEye />
                  View Details
                </ActionButton>
                <ActionButton 
                  className="remove"
                  onClick={() => removeFromWishlist(vehicle._id)}
                >
                  <FaTrash />
                  Remove
                </ActionButton>
              </Actions>
            </WishlistItem>
          ))}
        </WishlistGrid>
        
        {wishlist.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <ClearAllButton onClick={clearWishlist}>
              <FaTrash />
              Clear All Items
            </ClearAllButton>
          </div>
        )}
      </Container>
    </WishlistContainer>
  );
};

export default Wishlist;
