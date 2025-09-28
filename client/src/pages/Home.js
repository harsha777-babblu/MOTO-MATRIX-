import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaMotorcycle, FaBolt, FaMapMarkerAlt, FaCalculator, FaArrowRight, FaPlay } from 'react-icons/fa';
import VehicleCard from '../components/VehicleCard';
import { useQuery } from 'react-query';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(-10px) rotate(-1deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;


const HeroSection = styled.section`
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #06b6d4 50%, #10b981 75%, #f59e0b 100%)'};
  color: white;
  padding: 8rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  margin: 0;
  border-radius: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
    animation: ${float} 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 1s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  animation: ${slideIn} 1s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  position: relative;
  animation: ${slideIn} 1s ease-out 0.4s both;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.5rem 2rem 1.5rem 4rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #1e293b;
  
  &:focus {
    outline: none;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: #64748b;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1.2rem;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${slideIn} 1s ease-out 0.6s both;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'};
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #10b981 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#64748b'};
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
  box-shadow: 0 8px 32px ${props => props.theme === 'dark' 
    ? 'rgba(0, 0, 0, 0.3)'
    : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #06b6d4, #3b82f6, #8b5cf6);
    background-size: 200% 100%;
    animation: ${pulse} 3s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(0, 0, 0, 0.15)'};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#64748b'};
  line-height: 1.6;
`;

const PopularVehiclesSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'};
`;

const VehiclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StatsSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  color: white;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StatCard = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const Home = () => {
  const { theme } = useTheme();

  const { data: vehiclesData, isLoading } = useQuery(
    'featured-vehicles',
    async () => {
      const response = await axios.get('/api/vehicles');
      return response.data.vehicles?.slice(0, 6) || []; // Show only first 6 vehicles
    }
  );

  const features = [
    {
      icon: <FaMotorcycle />,
      title: "Extensive Collection",
      description: "Browse through hundreds of bikes from top brands with detailed specifications and real images."
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Find Showrooms",
      description: "Locate authorized dealers and showrooms near you for test rides and purchases."
    },
    {
      icon: <FaCalculator />,
      title: "Smart Calculators",
      description: "Calculate EMI, insurance, and total cost of ownership to make informed decisions."
    },
    {
      icon: <FaBolt />,
      title: "Quick Booking",
      description: "Book test rides instantly and get connected with dealers for the best deals."
    }
  ];

  const stats = [
    { number: "500+", label: "Bike Models" },
    { number: "50+", label: "Cities Covered" },
    { number: "10K+", label: "Happy Customers" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <>
      <HeroSection theme={theme}>
        <HeroContent>
          <HeroTitle>Find Your Perfect Ride</HeroTitle>
          <HeroSubtitle>
            Discover, compare, and book your dream bike from India's most trusted platform
          </HeroSubtitle>
          
          <SearchContainer>
            <SearchIcon />
            <SearchInput 
              type="text" 
              placeholder="Search for bikes, brands, or models..."
            />
          </SearchContainer>
          
          <CTAButtons>
            <CTAButton to="/vehicles">
              <FaMotorcycle />
              Browse Vehicles
              <FaArrowRight />
            </CTAButton>
            <CTAButton to="/book-test-ride">
              <FaPlay />
              Book Test Ride
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection theme={theme}>
        <div className="container">
          <SectionTitle theme={theme}>Why Choose Moto Matrix?</SectionTitle>
          <SectionSubtitle theme={theme}>
            We make bike buying simple, transparent, and enjoyable
          </SectionSubtitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                theme={theme}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                <FeatureDescription theme={theme}>
                  {feature.description}
                </FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <PopularVehiclesSection theme={theme}>
        <div className="container">
          <SectionTitle theme={theme}>Popular Vehicles</SectionTitle>
          <SectionSubtitle theme={theme}>
            Check out our most viewed and highly rated bikes
          </SectionSubtitle>
          
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '2rem', color: '#10b981' }}>Loading...</div>
            </div>
          ) : (
            <VehiclesGrid>
              {vehiclesData?.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </VehiclesGrid>
          )}
        </div>
      </PopularVehiclesSection>

      <StatsSection>
        <div className="container">
          <SectionTitle style={{ color: 'white', marginBottom: '3rem' }}>
            Trusted by Thousands
          </SectionTitle>
          
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </div>
      </StatsSection>
    </>
  );
};

export default Home;