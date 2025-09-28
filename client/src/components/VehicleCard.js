import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaMotorcycle, FaCreditCard } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import LikeButton from './LikeButton';

const CardContainer = styled(motion.div)`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--rainbow-gradient);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: gradientShift 3s ease infinite;
  }

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-8px) scale(1.02);
    border-color: var(--accent-primary);
  }
  
  &:hover::before {
    opacity: 1;
    animation: gradientShift 1s ease infinite;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const VehicleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const NewLaunchBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #10b981;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const UsedBikeBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #f59e0b;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ConditionBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => {
    switch(props.condition) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'fair': return '#f59e0b';
      default: return '#6b7280';
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  z-index: 2;
  text-transform: capitalize;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const VehicleName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
`;

const VehicleBrand = styled.p`
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#60a5fa' : '#3b82f6'};
  margin-bottom: 1rem;
`;

const UsedBikeInfo = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)'};
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.2)'};
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
`;

const UsedBikeDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
`;

const UsedBikeDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OriginalPrice = styled.div`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#94a3b8' : '#9ca3af'};
  text-decoration: line-through;
  margin-right: 0.5rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SavingsBadge = styled.div`
  background: #10b981;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const Specs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.125rem;
  color: #fbbf24;
`;

const ShowroomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &.test-ride {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
  }

  &.buy-now {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
  }
`;


const VehicleCard = ({ vehicle }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" style={{ opacity: 0.5 }} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} style={{ opacity: 0.3 }} />);
    }

    return stars;
  };

  return (
    <CardContainer
      theme={theme}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      as={Link}
      to={`/vehicles/${vehicle._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ImageContainer>
        <VehicleImage 
          src={vehicle.images?.[0] || '/api/placeholder/300/200'} 
          alt={vehicle.name}
        />
        <LikeButton vehicle={vehicle} />
        {vehicle.isNewLaunch && (
          <NewLaunchBadge>New Launch</NewLaunchBadge>
        )}
        {vehicle.isUsed && (
          <UsedBikeBadge>Used</UsedBikeBadge>
        )}
        {vehicle.isUsed && vehicle.condition && (
          <ConditionBadge condition={vehicle.condition}>
            {vehicle.condition}
          </ConditionBadge>
        )}
      </ImageContainer>

      <CardContent>
        <VehicleName theme={theme}>{vehicle.name}</VehicleName>
        <VehicleBrand theme={theme}>{vehicle.brand} • {vehicle.model}</VehicleBrand>
        
        {vehicle.isUsed ? (
          <PriceContainer>
            <OriginalPrice theme={theme}>{formatPrice(vehicle.originalPrice)}</OriginalPrice>
            <Price theme={theme}>{formatPrice(vehicle.price)}</Price>
            <SavingsBadge>Save {vehicle.priceReduction}%</SavingsBadge>
          </PriceContainer>
        ) : (
          <Price theme={theme}>{formatPrice(vehicle.price)}</Price>
        )}

        {vehicle.isUsed && (
          <UsedBikeInfo theme={theme}>
            <UsedBikeDetails theme={theme}>
              <UsedBikeDetail>
                <span>Year:</span>
                <span>{vehicle.year}</span>
              </UsedBikeDetail>
              <UsedBikeDetail>
                <span>Mileage:</span>
                <span>{vehicle.mileage}</span>
              </UsedBikeDetail>
              <UsedBikeDetail>
                <span>Owners:</span>
                <span>{vehicle.previousOwners}</span>
              </UsedBikeDetail>
              <UsedBikeDetail>
                <span>Warranty:</span>
                <span>{vehicle.warranty}</span>
              </UsedBikeDetail>
            </UsedBikeDetails>
          </UsedBikeInfo>
        )}

        <Specs>
          <SpecItem>
            <span>⚡</span>
            <span>{vehicle.specifications?.power || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span>⛽</span>
            <span>{vehicle.specifications?.mileage || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span>🔧</span>
            <span>{vehicle.specifications?.engine || 'N/A'}</span>
          </SpecItem>
        </Specs>

        <Rating>
          <Stars>
            {renderStars(vehicle.rating || 0)}
          </Stars>
          <span>({vehicle.reviews?.length || 0} reviews)</span>
        </Rating>

        {vehicle.showroomId && (
          <ShowroomInfo>
            <FaMapMarkerAlt />
            <span>{vehicle.showroomId.name}</span>
          </ShowroomInfo>
        )}

        <ActionButtons>
          <ActionButton
            className="test-ride"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/book-test-ride', { state: { vehicle } });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMotorcycle />
            Test Ride
          </ActionButton>
          <ActionButton
            className="buy-now"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/buy-bike', { state: { vehicle } });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCreditCard />
            Buy Now
          </ActionButton>
        </ActionButtons>
      </CardContent>
    </CardContainer>
  );
};

export default VehicleCard;
