import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFilter, FaSearch, FaTimes, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import VehicleCard from '../components/VehicleCard';
import axios from 'axios';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
  };
  padding: 2rem 0;
  transition: all 0.3s ease;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)'
    : 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c)'
  };
  background-size: 300% 300%;
  animation: gradientShift 6s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.8)'
  };
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.3)'
  };
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  min-width: 150px;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#4ecdc4' : '#667eea'};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FiltersSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FiltersTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 12px;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.8)'
  };
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 1rem;
  width: 300px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? '#4ecdc4' : '#667eea'};
    box-shadow: 0 0 0 3px ${props => props.theme === 'dark' 
      ? 'rgba(78, 205, 196, 0.1)'
      : 'rgba(102, 126, 234, 0.1)'
    };
  }
  
  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 1rem;
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 12px;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.8)'
  };
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? '#4ecdc4' : '#667eea'};
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 600;
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
    font-size: 0.9rem;
  }
  
  select {
    padding: 0.75rem;
    border: 2px solid ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'
    };
    border-radius: 12px;
    background: ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.8)'
    };
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme === 'dark' ? '#4ecdc4' : '#667eea'};
    }
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(78, 205, 196, 0.2)'
    : 'rgba(102, 126, 234, 0.2)'
  };
  color: ${props => props.theme === 'dark' ? '#4ecdc4' : '#667eea'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 0.7;
  }
`;

const VehiclesSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const VehiclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 12px;
  background: ${props => props.active 
    ? (props.theme === 'dark' ? '#4ecdc4' : '#667eea')
    : (props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)')
  };
  color: ${props => props.active 
    ? '#ffffff'
    : (props.theme === 'dark' ? '#e2e8f0' : '#2d3748')
  };
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 44px;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme === 'dark' ? '#4ecdc4' : '#667eea'};
    color: #ffffff;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
  font-size: 0.9rem;
  margin: 0 1rem;
`;

const UsedBikes = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    page: parseInt(searchParams.get('page')) || 1,
    limit: 12,
    brand: searchParams.get('brand') || '',
    type: searchParams.get('type') || '',
    fuelType: searchParams.get('fuelType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    condition: searchParams.get('condition') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc'
  });

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    if (!newFilters.hasOwnProperty('page')) {
      updatedFilters.page = 1;
    }
    setFilters(updatedFilters);
    
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  const { data: vehiclesData, isLoading, error } = useQuery(
    ['used-vehicles', filters],
    async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') {
          params.set(key, value);
        }
      });
      params.set('isUsed', 'true'); // Only fetch used bikes
      
      const response = await axios.get(`/api/vehicles?${params.toString()}`);
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const vehicles = vehiclesData?.vehicles || [];
  const totalPages = Math.ceil((vehiclesData?.total || 0) / filters.limit);

  const getActiveFilters = () => {
    const active = [];
    if (filters.brand) active.push({ key: 'brand', label: `Brand: ${filters.brand}` });
    if (filters.type) active.push({ key: 'type', label: `Type: ${filters.type}` });
    if (filters.fuelType) active.push({ key: 'fuelType', label: `Fuel: ${filters.fuelType}` });
    if (filters.minPrice) active.push({ key: 'minPrice', label: `Min: ₹${filters.minPrice}` });
    if (filters.maxPrice) active.push({ key: 'maxPrice', label: `Max: ₹${filters.maxPrice}` });
    if (filters.search) active.push({ key: 'search', label: `Search: ${filters.search}` });
    if (filters.condition) active.push({ key: 'condition', label: `Condition: ${filters.condition}` });
    return active;
  };

  const removeFilter = (key) => {
    updateFilters({ [key]: '' });
  };

  const clearAllFilters = () => {
    updateFilters({
      brand: '',
      type: '',
      fuelType: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      condition: '',
      page: 1
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <Container theme={theme}>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '1.5rem', color: theme === 'dark' ? '#4ecdc4' : '#667eea' }}>
            Loading used bikes...
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container theme={theme}>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>
            Error loading used bikes. Please try again.
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title theme={theme}>🏍️ Used Bikes Marketplace</Title>
          <Subtitle theme={theme}>
            Discover quality pre-owned motorcycles with verified history, 
            competitive pricing, and peace of mind warranty options.
          </Subtitle>
        </motion.div>
      </Header>

      <StatsSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatCard theme={theme} whileHover={{ scale: 1.05 }}>
            <StatNumber theme={theme}>{vehiclesData?.total || 0}</StatNumber>
            <StatLabel theme={theme}>Used Bikes Available</StatLabel>
          </StatCard>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatCard theme={theme} whileHover={{ scale: 1.05 }}>
            <StatNumber theme={theme}>15-35%</StatNumber>
            <StatLabel theme={theme}>Average Savings</StatLabel>
          </StatCard>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatCard theme={theme} whileHover={{ scale: 1.05 }}>
            <StatNumber theme={theme}>100%</StatNumber>
            <StatLabel theme={theme}>Verified History</StatLabel>
          </StatCard>
        </motion.div>
      </StatsSection>

      <FiltersSection>
        <FiltersHeader>
          <FiltersTitle theme={theme}>
            <FaFilter />
            Filter Used Bikes
          </FiltersTitle>
          
          <FilterControls>
            <SearchBar>
              <SearchIcon theme={theme} />
              <SearchInput
                theme={theme}
                type="text"
                placeholder="Search used bikes..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
              />
            </SearchBar>
            
            <SortSelect
              theme={theme}
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                updateFilters({ sortBy, sortOrder });
              }}
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="name-asc">Name: A to Z</option>
            </SortSelect>
          </FilterControls>
        </FiltersHeader>

        <FiltersGrid>
          <FilterGroup>
            <label>Brand</label>
            <select
              value={filters.brand}
              onChange={(e) => updateFilters({ brand: e.target.value })}
            >
              <option value="">All Brands</option>
              <option value="Bajaj">Bajaj</option>
              <option value="Hero">Hero</option>
              <option value="Honda">Honda</option>
              <option value="KTM">KTM</option>
              <option value="Royal Enfield">Royal Enfield</option>
              <option value="TVS">TVS</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Pure EV">Pure EV</option>
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Type</label>
            <select
              value={filters.type}
              onChange={(e) => updateFilters({ type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="Sports">Sports</option>
              <option value="Cruiser">Cruiser</option>
              <option value="Adventure">Adventure</option>
              <option value="Commuter">Commuter</option>
              <option value="Electric">Electric</option>
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Condition</label>
            <select
              value={filters.condition}
              onChange={(e) => updateFilters({ condition: e.target.value })}
            >
              <option value="">All Conditions</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Price Range</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => updateFilters({ minPrice: e.target.value })}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '12px',
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                  fontSize: '1rem'
                }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '12px',
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                  color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                  fontSize: '1rem'
                }}
              />
            </div>
          </FilterGroup>
        </FiltersGrid>

        {getActiveFilters().length > 0 && (
          <ActiveFilters>
            {getActiveFilters().map((filter) => (
              <FilterTag key={filter.key} theme={theme}>
                {filter.label}
                <RemoveFilterButton onClick={() => removeFilter(filter.key)}>
                  <FaTimes size={12} />
                </RemoveFilterButton>
              </FilterTag>
            ))}
            <FilterTag theme={theme} style={{ cursor: 'pointer' }} onClick={clearAllFilters}>
              Clear All
            </FilterTag>
          </ActiveFilters>
        )}
      </FiltersSection>

      <VehiclesSection>
        {vehicles.length === 0 ? (
          <NoResults theme={theme}>
            <h3>No used bikes found</h3>
            <p>Try adjusting your filters or search terms to find more options.</p>
          </NoResults>
        ) : (
          <>
            <VehiclesGrid>
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </VehiclesGrid>

            {totalPages > 1 && (
              <Pagination>
                <PageButton
                  theme={theme}
                  onClick={() => updateFilters({ page: filters.page - 1 })}
                  disabled={filters.page === 1}
                >
                  Previous
                </PageButton>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, filters.page - 2)) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <PageButton
                      key={pageNum}
                      theme={theme}
                      active={pageNum === filters.page}
                      onClick={() => updateFilters({ page: pageNum })}
                    >
                      {pageNum}
                    </PageButton>
                  );
                })}
                
                <PageButton
                  theme={theme}
                  onClick={() => updateFilters({ page: filters.page + 1 })}
                  disabled={filters.page === totalPages}
                >
                  Next
                </PageButton>
                
                <PageInfo theme={theme}>
                  Page {filters.page} of {totalPages}
                </PageInfo>
              </Pagination>
            )}
          </>
        )}
      </VehiclesSection>
    </Container>
  );
};

export default UsedBikes;
