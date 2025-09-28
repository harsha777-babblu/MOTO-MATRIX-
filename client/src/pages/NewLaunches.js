import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import VehicleCard from '../components/VehicleCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const VehiclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.125rem;
  color: #6b7280;
`;

const NewLaunches = () => {
  const { data: newLaunches, isLoading } = useQuery('newLaunches', async () => {
    const response = await axios.get('/api/vehicles/launches/new');
    return response.data;
  });

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner>Loading new launches...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Title>🆕 New Launches</Title>
      <VehiclesGrid>
        {newLaunches?.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </VehiclesGrid>
    </Container>
  );
};

export default NewLaunches;
