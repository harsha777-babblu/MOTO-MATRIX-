import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';
import MapComponent from '../components/MapComponent';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaSearch, 
  FaFilter,
  FaDirections,
  FaStar,
  FaCar,
  FaWrench,
  FaCreditCard,
  FaShieldAlt
} from 'react-icons/fa';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchSection = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(16, 185, 129, 0.1);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.1);
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  select, input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ShowroomsList = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`;

const ShowroomCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }

  &.selected {
    border-color: #3b82f6;
    background: #eff6ff;
  }
`;

const ShowroomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ShowroomName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ShowroomBrand = styled.div`
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
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
  margin-bottom: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const Services = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ServiceTag = styled.div`
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: white;
  border: none;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;

  &:hover {
    background: #3b82f6;
    color: white;
  }
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 80vh;
  position: sticky;
  top: 2rem;
`;


const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.125rem;
  color: #6b7280;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
  }
`;

const Showrooms = () => {
  const { theme } = useTheme();
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    brand: '',
    service: ''
  });

  const { data: showrooms, isLoading, error } = useQuery(
    ['showrooms', filters],
    async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(`/api/showrooms?${params.toString()}`);
      return response.data;
    }
  );

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const brands = ['Honda', 'Bajaj', 'TVS', 'Hero', 'Yamaha', 'Royal Enfield', 'KTM', 'Suzuki', 'Ola', 'Ather'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Coimbatore', 'Kochi', 'Chandigarh', 'Bhopal', 'Mysore'];
  const services = ['Sales', 'Service', 'Spare Parts', 'Insurance', 'Finance', 'Test Ride'];

  if (isLoading) {
    return (
      <Container theme={theme}>
        <LoadingSpinner>Loading showrooms...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container theme={theme}>
        <NoResults>
          <h3>Error loading showrooms</h3>
          <p>Please try again later.</p>
        </NoResults>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header>
        <Title>📍 Find Smart Showrooms</Title>
        <Subtitle>
          Discover premium showrooms with AI-powered services and 24/7 support
        </Subtitle>
      </Header>

      <SearchSection>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by city, area, or showroom name..."
            value={filters.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
        </SearchBar>

        <FiltersGrid>
          <FilterGroup>
            <label>City</label>
            <select
              value={filters.city}
              onChange={(e) => updateFilters({ city: e.target.value })}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => updateFilters({ brand: e.target.value })}
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Service</label>
            <select
              value={filters.service}
              onChange={(e) => updateFilters({ service: e.target.value })}
            >
              <option value="">All Services</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </FilterGroup>
        </FiltersGrid>
      </SearchSection>

      <ContentGrid>
        <ShowroomsList>
          {showrooms?.showrooms?.length === 0 ? (
            <NoResults>
              <h3>No showrooms found</h3>
              <p>Try adjusting your search criteria.</p>
            </NoResults>
          ) : (
            showrooms?.showrooms?.map((showroom) => (
              <ShowroomCard
                key={showroom._id}
                className={selectedShowroom?._id === showroom._id ? 'selected' : ''}
                onClick={() => setSelectedShowroom(showroom)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ShowroomHeader>
                  <div>
                    <ShowroomName>{showroom.name}</ShowroomName>
                    <ShowroomBrand>{showroom.brand}</ShowroomBrand>
                  </div>
                  <Rating>
                    <Stars>
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar key={i} style={{ 
                          color: i < Math.floor(showroom.rating) ? '#fbbf24' : '#e5e7eb' 
                        }} />
                      ))}
                    </Stars>
                    <span>({showroom.rating?.toFixed(1) || '0.0'})</span>
                  </Rating>
                </ShowroomHeader>

                <ShowroomInfo>
                  <FaMapMarkerAlt />
                  <span>{showroom.address.street}, {showroom.address.city}</span>
                </ShowroomInfo>

                <ShowroomInfo>
                  <FaPhone />
                  <span>{showroom.contact.phone}</span>
                </ShowroomInfo>

                <ShowroomInfo>
                  <FaClock />
                  <span>Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-6PM</span>
                </ShowroomInfo>

                <Services>
                  {showroom.services?.map((service, index) => (
                    <ServiceTag key={index}>
                      {service === 'Sales' && <FaCar style={{ marginRight: '0.25rem' }} />}
                      {service === 'Service' && <FaWrench style={{ marginRight: '0.25rem' }} />}
                      {service === 'Finance' && <FaCreditCard style={{ marginRight: '0.25rem' }} />}
                      {service === 'Insurance' && <FaShieldAlt style={{ marginRight: '0.25rem' }} />}
                      {service}
                    </ServiceTag>
                  ))}
                </Services>

                <ActionButtons>
                  <PrimaryButton>
                    <FaPhone />
                    Call Now
                  </PrimaryButton>
                  <SecondaryButton>
                    <FaDirections />
                    Directions
                  </SecondaryButton>
                </ActionButtons>
              </ShowroomCard>
            ))
          )}
        </ShowroomsList>

        <MapContainer>
          <MapComponent 
            showrooms={showrooms?.showrooms || []}
            selectedShowroom={selectedShowroom}
            onShowroomSelect={setSelectedShowroom}
          />
        </MapContainer>
      </ContentGrid>
    </Container>
  );
};

export default Showrooms;
