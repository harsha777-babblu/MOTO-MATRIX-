import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaDirections, FaPhone } from 'react-icons/fa';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-align: center;
  position: relative;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }

  .map-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    z-index: 1;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    z-index: 1;
  }

  p {
    opacity: 0.9;
    max-width: 300px;
    z-index: 1;
  }
`;

const MapControls = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
`;

const ControlButton = styled.button`
  background: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;

  &:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }
`;

const ShowroomInfo = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1rem;
  z-index: 10;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ShowroomName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ShowroomDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border: none;
`;

const PrimaryButton = styled(ActionButton)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;

  &:hover {
    background: #3b82f6;
    color: white;
  }
`;

const MapComponent = ({ showrooms = [], selectedShowroom, onShowroomSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Initialize map
  useEffect(() => {
    if (showrooms.length > 0) {
      initializeMap();
    }
  }, [showrooms]);

  // Update markers when showrooms change
  useEffect(() => {
    if (map && showrooms.length > 0) {
      updateMarkers();
    }
  }, [map, showrooms, selectedShowroom]);

  const initializeMap = () => {
    // For demo purposes, we'll use a placeholder map
    // In production, you would integrate with Google Maps API or Mapbox
    console.log('Initializing map with showrooms:', showrooms);
  };

  const updateMarkers = () => {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    
    const newMarkers = showrooms.map(showroom => {
      const marker = {
        id: showroom._id,
        position: showroom.address.coordinates,
        showroom: showroom,
        isSelected: selectedShowroom?._id === showroom._id
      };
      return marker;
    });
    
    setMarkers(newMarkers);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const centerOnShowroom = (showroom) => {
    if (onShowroomSelect) {
      onShowroomSelect(showroom);
    }
  };

  const getDirections = (showroom) => {
    const { lat, lng } = showroom.address.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const callShowroom = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <MapContainer>
      <MapPlaceholder>
        <div className="map-icon">
          <FaMapMarkerAlt />
        </div>
        <h3>Interactive Map</h3>
        <p>
          {selectedShowroom 
            ? `Viewing ${selectedShowroom.name} location`
            : showrooms.length > 0 
              ? `Found ${showrooms.length} showrooms near you`
              : 'Search for showrooms to view on map'
          }
        </p>
        
        {showrooms.length > 0 && (
          <div style={{ 
            marginTop: '1rem', 
            fontSize: '0.875rem', 
            opacity: 0.8,
            maxWidth: '400px'
          }}>
            <p>📍 Click on showrooms in the list to view their location</p>
            <p>🗺️ Interactive map with {showrooms.length} showrooms across India</p>
            <p>🚀 Real-time GPS coordinates and directions available</p>
            <p>📱 Mobile-optimized for easy navigation</p>
          </div>
        )}
      </MapPlaceholder>

      <MapControls>
        <ControlButton onClick={getCurrentLocation} title="Get Current Location">
          📍
        </ControlButton>
        <ControlButton title="Zoom In">
          ➕
        </ControlButton>
        <ControlButton title="Zoom Out">
          ➖
        </ControlButton>
      </MapControls>

      {selectedShowroom && (
        <ShowroomInfo show={!!selectedShowroom}>
          <ShowroomName>{selectedShowroom.name}</ShowroomName>
          
          <ShowroomDetails>
            <FaMapMarkerAlt />
            <span>{selectedShowroom.address.street}, {selectedShowroom.address.city}</span>
          </ShowroomDetails>
          
          <ShowroomDetails>
            <FaPhone />
            <span>{selectedShowroom.contact.phone}</span>
          </ShowroomDetails>

          <ActionButtons>
            <PrimaryButton onClick={() => callShowroom(selectedShowroom.contact.phone)}>
              <FaPhone />
              Call
            </PrimaryButton>
            <SecondaryButton onClick={() => getDirections(selectedShowroom)}>
              <FaDirections />
              Directions
            </SecondaryButton>
          </ActionButtons>
        </ShowroomInfo>
      )}
    </MapContainer>
  );
};

export default MapComponent;
