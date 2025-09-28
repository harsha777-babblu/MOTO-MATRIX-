import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';
import {
  FaHeart,
  FaShare,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaExchangeAlt,
  FaChevronDown,
  FaChevronUp,
  FaThumbsUp,
  FaCheckCircle
} from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'};
  min-height: 100vh;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #3b82f6;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  position: relative;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #f8fafc;
`;

const VehicleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const Thumbnail = styled.div`
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  &.active {
    border-color: #3b82f6;
  }

  &:hover {
    border-color: #3b82f6;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsSection = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .brand {
    color: #6b7280;
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 2.5rem;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

const IconButton = styled.button`
  background: #f3f4f6;
  border: none;
  border-radius: 0.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;

  &:hover {
    background: #e5e7eb;
    color: #3b82f6;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #fbbf24;
`;

const SpecsSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e293b;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;

  .label {
    font-weight: 500;
    color: #6b7280;
  }

  .value {
    font-weight: 600;
    color: #1e293b;
  }
`;

const ColorsGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ColorOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;

  &.active {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  &:hover {
    background: #f8fafc;
  }
`;

const ColorSwatch = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ccc;
  border: 2px solid #e5e7eb;
`;

const VariantsGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const VariantCard = styled.div`
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  &:hover {
    border-color: #3b82f6;
  }
`;

const VariantName = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const VariantPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const VariantFeatures = styled.ul`
  list-style: none;
  padding: 0;
  color: #6b7280;
  font-size: 0.875rem;

  li {
    margin-bottom: 0.25rem;
  }
`;

const ReviewsSection = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ReviewsStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
`;

const ShowAllButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }
`;

const ReviewsContainer = styled.div`
  max-height: ${props => props.showAll ? 'none' : '400px'};
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
`;

const ReviewsFade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(transparent, rgba(30, 41, 59, 0.9))'
    : 'linear-gradient(transparent, rgba(255, 255, 255, 0.9))'};
  display: ${props => props.showAll ? 'none' : 'block'};
  pointer-events: none;
`;

const ReviewItem = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};

  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ReviewUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 0.25rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
`;

const ReviewMeta = styled.div`
  text-align: right;
  font-size: 0.875rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
`;

const ReviewComment = styled.p`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4b5563'};
  line-height: 1.6;
  margin: 0;
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const HelpfulButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.2)'};
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: #10b981;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.125rem;
  color: #6b7280;
`;

const VehicleDetail = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsToShow = 3;

  const { data: vehicle, isLoading, error } = useQuery(
    ['vehicle', id],
    async () => {
      const response = await axios.get(`/api/vehicles/${id}`);
      return response.data;
    }
  );

  // Fetch images for selected color
  const { data: colorImages } = useQuery(
    ['vehicleImages', vehicle?.name, vehicle?.availableColors?.[selectedColor]],
    async () => {
      if (!vehicle?.name || !vehicle?.availableColors?.[selectedColor]) return null;
      const response = await axios.get(
        `/api/vehicles/${encodeURIComponent(vehicle.name)}/images/${encodeURIComponent(vehicle.availableColors[selectedColor])}`
      );
      return response.data.images;
    },
    {
      enabled: !!vehicle?.name && !!vehicle?.availableColors?.[selectedColor]
    }
  );

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

  // Get current images (color-specific or default)
  const currentImages = colorImages || vehicle?.images || [];

  const nextImage = () => {
    if (currentImages.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === currentImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (currentImages.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentImages.length - 1 : prev - 1
      );
    }
  };

  // Reset image index when color changes
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  if (isLoading) {
    return (
      <Container theme={theme}>
        <LoadingSpinner>Loading vehicle details...</LoadingSpinner>
      </Container>
    );
  }

  if (error || !vehicle) {
    return (
      <Container theme={theme}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Vehicle not found</h2>
          <p>The vehicle you're looking for doesn't exist.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/vehicles')}
          >
            Browse Vehicles
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <BackButton onClick={() => navigate(-1)}>
        <FaChevronLeft />
        Back to Vehicles
      </BackButton>

      <MainContent>
        <ImageSection>
          <MainImage>
            <VehicleImage 
              src={currentImages[currentImageIndex] || '/api/placeholder/600/400'} 
              alt={vehicle.name}
            />
            {currentImages.length > 1 && (
              <>
                <ImageNavigation className="prev" onClick={prevImage}>
                  <FaChevronLeft />
                </ImageNavigation>
                <ImageNavigation className="next" onClick={nextImage}>
                  <FaChevronRight />
                </ImageNavigation>
              </>
            )}
          </MainImage>

          {currentImages.length > 1 && (
            <ThumbnailGrid>
              {currentImages.map((image, index) => (
                <Thumbnail
                  key={index}
                  className={index === currentImageIndex ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <ThumbnailImage src={image} alt={`${vehicle.name} ${index + 1}`} />
                </Thumbnail>
              ))}
            </ThumbnailGrid>
          )}
        </ImageSection>

        <DetailsSection>
          <h1>{vehicle.name}</h1>
          <p className="brand">{vehicle.brand} • {vehicle.model} • {vehicle.year}</p>
          <div className="price">{formatPrice(vehicle.price)}</div>

          <Rating>
            <Stars>
              {renderStars(vehicle.rating || 0)}
            </Stars>
            <span>({vehicle.reviews?.length || 0} reviews)</span>
          </Rating>

          <ActionButtons>
            <PrimaryButton onClick={() => navigate(`/book-test-ride?vehicle=${vehicle._id}`)}>
              <FaCalendarAlt />
              Book Test Ride
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate(`/compare?vehicles=${vehicle._id}`)}>
              <FaExchangeAlt />
              Compare
            </SecondaryButton>
            <IconButton>
              <FaHeart />
            </IconButton>
            <IconButton>
              <FaShare />
            </IconButton>
          </ActionButtons>

          {vehicle.showroomId && (
            <div style={{ 
              background: '#f8fafc', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>
                Available at Showroom
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                <FaMapMarkerAlt />
                <span>{vehicle.showroomId.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', marginTop: '0.25rem' }}>
                <FaPhone />
                <span>{vehicle.showroomId.contact?.phone}</span>
              </div>
            </div>
          )}
        </DetailsSection>
      </MainContent>

      <SpecsSection>
        <SectionTitle>Specifications</SectionTitle>
        <SpecsGrid>
          <SpecItem>
            <span className="label">Engine</span>
            <span className="value">{vehicle.specifications?.engine || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">Power</span>
            <span className="value">{vehicle.specifications?.power || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">Torque</span>
            <span className="value">{vehicle.specifications?.torque || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">Mileage</span>
            <span className="value">{vehicle.specifications?.mileage || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">Weight</span>
            <span className="value">{vehicle.specifications?.weight || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">Fuel Capacity</span>
            <span className="value">{vehicle.specifications?.fuelCapacity || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">Transmission</span>
            <span className="value">{vehicle.specifications?.transmission || 'N/A'}</span>
          </SpecItem>
          <SpecItem>
            <span className="label">Brakes</span>
            <span className="value">{vehicle.specifications?.brakes || 'N/A'}</span>
          </SpecItem>
        </SpecsGrid>
      </SpecsSection>

      {vehicle.availableColors?.length > 0 && (
        <SpecsSection>
          <SectionTitle>Available Colors</SectionTitle>
          <ColorsGrid>
            {vehicle.availableColors.map((color, index) => (
              <ColorOption
                key={index}
                className={index === selectedColor ? 'active' : ''}
                onClick={() => setSelectedColor(index)}
              >
                <ColorSwatch />
                <span>{color}</span>
              </ColorOption>
            ))}
          </ColorsGrid>
        </SpecsSection>
      )}

      {vehicle.variants?.length > 0 && (
        <SpecsSection>
          <SectionTitle>Variants</SectionTitle>
          <VariantsGrid>
            {vehicle.variants.map((variant, index) => (
              <VariantCard
                key={index}
                className={index === selectedVariant ? 'active' : ''}
                onClick={() => setSelectedVariant(index)}
              >
                <VariantName>{variant.name}</VariantName>
                <VariantPrice>{formatPrice(variant.price)}</VariantPrice>
                <VariantFeatures>
                  {variant.features?.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </VariantFeatures>
              </VariantCard>
            ))}
          </VariantsGrid>
        </SpecsSection>
      )}

      {vehicle.reviews?.length > 0 && (
        <ReviewsSection theme={theme}>
          <ReviewsHeader>
            <div>
              <SectionTitle>Customer Reviews</SectionTitle>
              <ReviewsStats theme={theme}>
                <span>{vehicle.reviews.length} reviews</span>
                <span>•</span>
                <Stars>
                  {renderStars(vehicle.rating || 0)}
                </Stars>
                <span>{vehicle.rating}/5</span>
              </ReviewsStats>
            </div>
            <ShowAllButton
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? (
                <>
                  <FaChevronUp />
                  Show Less
                </>
              ) : (
                <>
                  <FaChevronDown />
                  Show All {vehicle.reviews.length} Reviews
                </>
              )}
            </ShowAllButton>
          </ReviewsHeader>

          <ReviewsContainer showAll={showAllReviews}>
            {(showAllReviews ? vehicle.reviews : vehicle.reviews.slice(0, reviewsToShow)).map((review, index) => (
              <ReviewItem key={index} theme={theme}>
                <ReviewHeader>
                  <ReviewUser>
                    <UserAvatar>
                      {review.userId?.name?.charAt(0) || 'U'}
                    </UserAvatar>
                    <UserDetails>
                      <UserName theme={theme}>
                        {review.userId?.name || 'Anonymous'}
                        {review.verified && (
                          <VerifiedBadge>
                            <FaCheckCircle size={10} />
                            Verified
                          </VerifiedBadge>
                        )}
                      </UserName>
                      <UserInfo theme={theme}>
                        <Stars>
                          {renderStars(review.rating)}
                        </Stars>
                        {review.userId?.location && (
                          <>
                            <span>•</span>
                            <span>{review.userId.location}</span>
                          </>
                        )}
                      </UserInfo>
                    </UserDetails>
                  </ReviewUser>
                  <ReviewMeta theme={theme}>
                    <div>{new Date(review.date).toLocaleDateString()}</div>
                  </ReviewMeta>
                </ReviewHeader>
                <ReviewComment theme={theme}>{review.comment}</ReviewComment>
                <ReviewFooter theme={theme}>
                  <HelpfulButton theme={theme}>
                    <FaThumbsUp size={12} />
                    Helpful ({review.helpful || 0})
                  </HelpfulButton>
                </ReviewFooter>
              </ReviewItem>
            ))}
            
            {!showAllReviews && vehicle.reviews.length > reviewsToShow && (
              <ReviewsFade theme={theme} />
            )}
          </ReviewsContainer>
        </ReviewsSection>
      )}
    </Container>
  );
};

export default VehicleDetail;
