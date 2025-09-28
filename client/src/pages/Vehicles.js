import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import VehicleCard from '../components/VehicleCard';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'};
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: ${props => props.theme === 'dark'
    ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)'
    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  font-size: 1.125rem;
`;

const FiltersSection = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.1);
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
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
  margin-bottom: 1rem;
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
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ResultsCount = styled.p`
  color: #6b7280;
  font-weight: 500;
`;

const SortSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const VehiclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }

  &.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

const Vehicles = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || '',
    type: searchParams.get('type') || '',
    fuelType: searchParams.get('fuelType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    page: parseInt(searchParams.get('page')) || 1,
    isUsed: searchParams.get('isUsed') || ''
  });

  const { data, isLoading, error } = useQuery(
    ['vehicles', filters],
    async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(`/api/vehicles?${params.toString()}`);
      return response.data;
    },
    {
      keepPreviousData: true
    }
  );

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    // Only reset to page 1 if it's not a page navigation
    if (!newFilters.hasOwnProperty('page')) {
      updatedFilters.page = 1;
    }
    setFilters(updatedFilters);
    
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const removeFilter = (key) => {
    const updatedFilters = { ...filters, [key]: '', page: 1 };
    setFilters(updatedFilters);
    
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([filterKey, value]) => {
      if (value) params.set(filterKey, value);
    });
    setSearchParams(params);
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.brand) active.push({ key: 'brand', label: `Brand: ${filters.brand}` });
    if (filters.type) active.push({ key: 'type', label: `Type: ${filters.type}` });
    if (filters.fuelType) active.push({ key: 'fuelType', label: `Fuel: ${filters.fuelType}` });
    if (filters.minPrice) active.push({ key: 'minPrice', label: `Min: ₹${filters.minPrice}` });
    if (filters.maxPrice) active.push({ key: 'maxPrice', label: `Max: ₹${filters.maxPrice}` });
    if (filters.isUsed === 'true') active.push({ key: 'isUsed', label: 'Used Bikes' });
    if (filters.isUsed === 'false') active.push({ key: 'isUsed', label: 'New Bikes' });
    return active;
  };

  const brands = ['Honda', 'Bajaj', 'TVS', 'Hero', 'Yamaha', 'Royal Enfield', 'KTM', 'Suzuki'];
  const types = ['Bike', 'Scooter', 'Electric Vehicle'];
  const fuelTypes = ['Petrol', 'Electric', 'Hybrid'];

  if (isLoading) {
    return (
      <Container theme={theme}>
        <LoadingSpinner>Loading vehicles...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container theme={theme}>
        <NoResults>
          <h3>Error loading vehicles</h3>
          <p>Please try again later.</p>
        </NoResults>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header>
        <Title theme={theme}>🏍️ Browse Vehicles</Title>
        <Subtitle theme={theme}>Discover your perfect two-wheeler from our premium collection with AI-powered recommendations</Subtitle>
      </Header>

      <FiltersSection>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search for vehicles, brands, or models..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
        </SearchBar>

        <FiltersGrid>
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
            <label>Vehicle Type</label>
            <select
              value={filters.type}
              onChange={(e) => updateFilters({ type: e.target.value })}
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Fuel Type</label>
            <select
              value={filters.fuelType}
              onChange={(e) => updateFilters({ fuelType: e.target.value })}
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map(fuel => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup>
            <label>Min Price (₹)</label>
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => updateFilters({ minPrice: e.target.value })}
            />
          </FilterGroup>

          <FilterGroup>
            <label>Max Price (₹)</label>
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: e.target.value })}
            />
          </FilterGroup>

          <FilterGroup>
            <label>Condition</label>
            <select
              value={filters.isUsed}
              onChange={(e) => updateFilters({ isUsed: e.target.value })}
            >
              <option value="">All Conditions</option>
              <option value="false">New Bikes</option>
              <option value="true">Used Bikes</option>
            </select>
          </FilterGroup>
        </FiltersGrid>

        {getActiveFilters().length > 0 && (
          <ActiveFilters>
            {getActiveFilters().map(filter => (
              <FilterTag key={filter.key}>
                {filter.label}
                <RemoveFilterButton onClick={() => removeFilter(filter.key)}>
                  <FaTimes />
                </RemoveFilterButton>
              </FilterTag>
            ))}
          </ActiveFilters>
        )}
      </FiltersSection>

      <ResultsHeader>
        <ResultsCount>
          {data?.total || 0} vehicles found
        </ResultsCount>
        <SortSelect
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
      </ResultsHeader>

      {data?.vehicles?.length === 0 ? (
        <NoResults>
          <h3>No vehicles found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </NoResults>
      ) : (
        <>
          <VehiclesGrid>
            {data?.vehicles?.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </VehiclesGrid>

          {data?.totalPages > 1 && (
            <Pagination>
              <PageButton
                disabled={filters.page === 1}
                onClick={() => updateFilters({ page: filters.page - 1 })}
              >
                Previous
              </PageButton>
              
              {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PageButton
                    key={pageNum}
                    className={filters.page === pageNum ? 'active' : ''}
                    onClick={() => updateFilters({ page: pageNum })}
                  >
                    {pageNum}
                  </PageButton>
                );
              })}
              
              <PageButton
                disabled={filters.page === data.totalPages}
                onClick={() => updateFilters({ page: filters.page + 1 })}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};

export default Vehicles;
