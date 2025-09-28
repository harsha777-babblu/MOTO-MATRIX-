import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';
import { FaPlus, FaTimes, FaStar, FaCheck, FaSearch, FaMotorcycle } from 'react-icons/fa';
import VehicleCard from '../components/VehicleCard';

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
  color: #6b7280;
  font-size: 1.125rem;
`;

const SelectionSection = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.1);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 0.75rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(15, 23, 42, 0.5)'
    : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#94a3b8' : '#9ca3af'};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme === 'dark' ? '#94a3b8' : '#9ca3af'};
  font-size: 1.1rem;
`;

const SearchResults = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 0.75rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(15, 23, 42, 0.5)'
    : 'rgba(255, 255, 255, 0.8)'};
  margin-top: 0.5rem;
`;

const SearchResultItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background: ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.02)'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ResultImage = styled.img`
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ResultDetails = styled.div`
  flex: 1;
`;

const ResultName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 0.25rem;
`;

const ResultSpecs = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  margin-bottom: 0.25rem;
`;

const ResultPrice = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #10b981;
`;

const SearchAddButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #059669;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const VehicleSlot = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  position: relative;

  &.filled {
    border: 2px solid #3b82f6;
    background: #eff6ff;
  }

  &.empty {
    cursor: pointer;
    
    &:hover {
      border-color: #3b82f6;
      background: #f8fafc;
    }
  }
`;

const AddButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
    transform: scale(1.1);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

const SlotText = styled.p`
  color: #6b7280;
  margin-top: 1rem;
  font-weight: 500;
`;

const CompareButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const ComparisonTable = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const TableHeader = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const TableTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
`;

const TableContent = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8fafc;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  min-width: 200px;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
`;

const VehicleHeader = styled.div`
  text-align: center;
  padding: 1rem;
  background: #eff6ff;
  border-bottom: 1px solid #e5e7eb;
`;

const VehicleImage = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;

const VehicleName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const VehiclePrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  color: #fbbf24;
  font-size: 0.875rem;
`;

const SpecValue = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const WinnerBadge = styled.div`
  background: #10b981;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.125rem;
  color: #6b7280;
`;

const Compare = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { data: vehicles, isLoading } = useQuery(
    ['compareVehicles', selectedVehicles],
    async () => {
      if (selectedVehicles.length === 0) return [];
      const response = await axios.post('/api/vehicles/compare', {
        vehicleIds: selectedVehicles
      });
      return response.data;
    },
    {
      enabled: selectedVehicles.length > 0
    }
  );

  const { data: allVehicles } = useQuery(
    'allVehicles',
    async () => {
      const response = await axios.get('/api/vehicles');
      return response.data.vehicles || [];
    }
  );

  useEffect(() => {
    const vehicleIds = searchParams.get('vehicles');
    if (vehicleIds) {
      const ids = vehicleIds.split(',').filter(id => id.trim());
      setSelectedVehicles(ids);
      setShowComparison(true);
    }
  }, [searchParams]);


  const removeVehicle = (vehicleId) => {
    const newSelection = selectedVehicles.filter(id => id !== vehicleId);
    setSelectedVehicles(newSelection);
    if (newSelection.length === 0) {
      setShowComparison(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = allVehicles?.filter(vehicle => 
        vehicle.name.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(query.toLowerCase())
      ) || [];
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const addVehicleToComparison = (vehicle) => {
    if (selectedVehicles.length < 4 && !selectedVehicles.includes(vehicle._id)) {
      const newSelection = [...selectedVehicles, vehicle._id];
      setSelectedVehicles(newSelection);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleCompare = () => {
    if (selectedVehicles.length >= 2) {
      setShowComparison(true);
      setSearchParams({ vehicles: selectedVehicles.join(',') });
    }
  };

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

  const getWinner = (vehicles, field, isLowerBetter = false) => {
    if (!vehicles || vehicles.length === 0) return null;
    
    let winner = vehicles[0];
    let bestValue = winner[field];

    for (let i = 1; i < vehicles.length; i++) {
      const currentValue = vehicles[i][field];
      if (isLowerBetter ? currentValue < bestValue : currentValue > bestValue) {
        winner = vehicles[i];
        bestValue = currentValue;
      }
    }

    return winner._id;
  };

  if (isLoading) {
    return (
      <Container theme={theme}>
        <LoadingSpinner>Loading comparison...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Header>
        <Title>⚖️ Compare Vehicles</Title>
        <Subtitle>Compare up to 4 vehicles side by side with AI-powered insights to make the best choice</Subtitle>
      </Header>

      {!showComparison ? (
        <SelectionSection theme={theme}>
          <SearchSection>
            <SearchTitle theme={theme}>
              <FaSearch />
              Search & Add Vehicles to Compare
            </SearchTitle>
            <SearchBar>
              <SearchIcon theme={theme}>
                <FaMotorcycle />
              </SearchIcon>
              <SearchInput
                theme={theme}
                type="text"
                placeholder="Search by bike name, brand, or model..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </SearchBar>
            
            {showSearchResults && searchResults.length > 0 && (
              <SearchResults theme={theme}>
                {searchResults.map(vehicle => (
                  <SearchResultItem
                    key={vehicle._id}
                    theme={theme}
                    onClick={() => addVehicleToComparison(vehicle)}
                  >
                    <ResultImage 
                      src={vehicle.images?.[0] || '/api/placeholder/60/45'} 
                      alt={vehicle.name}
                    />
                    <ResultDetails>
                      <ResultName theme={theme}>{vehicle.name}</ResultName>
                      <ResultSpecs theme={theme}>
                        {vehicle.brand} • {vehicle.model} • {vehicle.specifications?.power || 'N/A'}
                      </ResultSpecs>
                      <ResultPrice>₹{vehicle.price?.toLocaleString()}</ResultPrice>
                    </ResultDetails>
                    <SearchAddButton
                      disabled={selectedVehicles.includes(vehicle._id) || selectedVehicles.length >= 4}
                      onClick={(e) => {
                        e.stopPropagation();
                        addVehicleToComparison(vehicle);
                      }}
                    >
                      {selectedVehicles.includes(vehicle._id) ? 'Added' : 'Add'}
                    </SearchAddButton>
                  </SearchResultItem>
                ))}
              </SearchResults>
            )}

            {showSearchResults && searchResults.length === 0 && searchQuery.trim().length > 0 && (
              <SearchResults theme={theme}>
                <div style={{ 
                  padding: '2rem', 
                  textAlign: 'center', 
                  color: theme === 'dark' ? '#cbd5e1' : '#6b7280' 
                }}>
                  No vehicles found matching "{searchQuery}"
                </div>
              </SearchResults>
            )}
          </SearchSection>

          <SelectionGrid>
            {Array.from({ length: 4 }, (_, index) => {
              const vehicleId = selectedVehicles[index];
              const vehicle = vehicles?.find(v => v._id === vehicleId);
              
              return (
                <VehicleSlot
                  key={index}
                  className={vehicle ? 'filled' : 'empty'}
                >
                  {vehicle ? (
                    <>
                      <RemoveButton onClick={() => removeVehicle(vehicle._id)}>
                        <FaTimes />
                      </RemoveButton>
                      <VehicleCard vehicle={vehicle} />
                    </>
                  ) : (
                    <>
                      <AddButton>
                        <FaPlus />
                      </AddButton>
                      <SlotText>
                        {index === 0 ? 'Search & add first vehicle' : 
                         index === 1 ? 'Search & add second vehicle' :
                         index === 2 ? 'Search & add third vehicle' : 'Search & add fourth vehicle'}
                      </SlotText>
                    </>
                  )}
                </VehicleSlot>
              );
            })}
          </SelectionGrid>

          <CompareButton
            onClick={handleCompare}
            disabled={selectedVehicles.length < 2}
          >
            Compare {selectedVehicles.length} Vehicle{selectedVehicles.length !== 1 ? 's' : ''}
          </CompareButton>
        </SelectionSection>
      ) : (
        <ComparisonTable>
          <TableHeader>
            <TableTitle>Vehicle Comparison</TableTitle>
          </TableHeader>
          
          <TableContent>
            <Table>
              <thead>
                <TableRow>
                  <TableHeaderCell>Specification</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableHeaderCell key={vehicle._id}>
                      <VehicleHeader>
                        <VehicleImage 
                          src={vehicle.images?.[0] || '/api/placeholder/100/80'} 
                          alt={vehicle.name}
                        />
                        <VehicleName>{vehicle.name}</VehicleName>
                        <VehiclePrice>{formatPrice(vehicle.price)}</VehiclePrice>
                        <Rating>
                          {renderStars(vehicle.rating || 0)}
                          <span>({vehicle.reviews?.length || 0})</span>
                        </Rating>
                      </VehicleHeader>
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </thead>
              
              <tbody>
                <TableRow>
                  <TableHeaderCell>Brand</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.brand}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Model</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.model}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Year</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.year}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Type</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.type}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Fuel Type</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.fuelType}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Price</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>
                        {formatPrice(vehicle.price)}
                        {getWinner(vehicles, 'price', true) === vehicle._id && (
                          <WinnerBadge>Best Value</WinnerBadge>
                        )}
                      </SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Engine</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.specifications?.engine || 'N/A'}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Power</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.specifications?.power || 'N/A'}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Mileage</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.specifications?.mileage || 'N/A'}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Weight</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.specifications?.weight || 'N/A'}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Transmission</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>{vehicle.specifications?.transmission || 'N/A'}</SpecValue>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Features</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <FeatureList>
                        {vehicle.specifications?.features?.slice(0, 5).map((feature, index) => (
                          <FeatureItem key={index}>
                            <FaCheck style={{ color: '#10b981', fontSize: '0.75rem' }} />
                            {feature}
                          </FeatureItem>
                        ))}
                      </FeatureList>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableHeaderCell>Rating</TableHeaderCell>
                  {vehicles?.map((vehicle) => (
                    <TableCell key={vehicle._id}>
                      <SpecValue>
                        <Rating>
                          {renderStars(vehicle.rating || 0)}
                          <span>{vehicle.rating?.toFixed(1) || '0.0'}</span>
                        </Rating>
                        {getWinner(vehicles, 'rating') === vehicle._id && (
                          <WinnerBadge>Highest Rated</WinnerBadge>
                        )}
                      </SpecValue>
                    </TableCell>
                  ))}
                </TableRow>
              </tbody>
            </Table>
          </TableContent>
        </ComparisonTable>
      )}
    </Container>
  );
};

export default Compare;
