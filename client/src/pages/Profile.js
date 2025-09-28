import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Profile = () => {
  return (
    <Container>
      <Title>User Profile</Title>
      <ComingSoon>
        <h2>Coming Soon!</h2>
        <p>User profile management will be available soon.</p>
      </ComingSoon>
    </Container>
  );
};

export default Profile;
