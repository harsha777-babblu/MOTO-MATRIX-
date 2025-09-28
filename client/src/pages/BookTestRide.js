import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaUser, 
  FaIdCard,
  FaMotorcycle,
  FaCheckCircle,
  FaArrowLeft,
  FaStar,
  FaShieldAlt
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

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
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
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  max-width: 600px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  }
`;

const BookingForm = styled(motion.div)`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 1rem;
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

const Select = styled.select`
  padding: 1rem;
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
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 0.75rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(15, 23, 42, 0.5)'
    : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
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

const VehicleInfo = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.6)'
    : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const VehicleImage = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

const VehicleDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const VehicleText = styled.div`
  flex: 1;
`;

const VehicleName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 0.25rem;
`;

const VehiclePrice = styled.p`
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  font-size: 0.9rem;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BenefitsSection = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const BenefitsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(15, 23, 42, 0.5)'
    : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 0.75rem;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const BenefitIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const BenefitText = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 0.25rem;
`;

const BenefitDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
`;

const BookTestRide = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state?.vehicle;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    location: '',
    licenseNumber: '',
    experience: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: showroomsData } = useQuery(
    'showrooms',
    async () => {
      const response = await axios.get('/api/showrooms');
      return response.data.showrooms || [];
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/vehicles');
      }, 3000);
    } catch (error) {
      console.error('Error booking test ride:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Container theme={theme}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
          style={{ padding: '4rem 2rem' }}
        >
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }} />
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
            marginBottom: '1rem'
          }}>
            Test Ride Booked Successfully!
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: theme === 'dark' ? '#cbd5e1' : '#6b7280',
            marginBottom: '2rem'
          }}>
            We'll contact you within 24 hours to confirm your test ride appointment.
          </p>
          <motion.button
            onClick={() => navigate('/vehicles')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Vehicles
          </motion.button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <BackButton theme={theme} onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Back
      </BackButton>

      <Header>
        <Title theme={theme}>
          <FaMotorcycle />
          Book Test Ride
        </Title>
        <Subtitle theme={theme}>
          Experience your dream bike before you buy. Schedule a test ride at your convenience.
        </Subtitle>
      </Header>

      <BookingForm
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {vehicle && (
          <VehicleInfo theme={theme}>
            <VehicleDetails>
              <VehicleImage 
                src={vehicle.images?.[0] || '/api/placeholder/100/80'} 
                alt={vehicle.name}
              />
              <VehicleText>
                <VehicleName theme={theme}>{vehicle.name}</VehicleName>
                <VehiclePrice theme={theme}>
                  {vehicle.brand} • {vehicle.model} • ₹{vehicle.price?.toLocaleString()}
                </VehiclePrice>
              </VehicleText>
            </VehicleDetails>
          </VehicleInfo>
        )}

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label theme={theme}>
                <FaUser />
                Full Name *
              </Label>
              <Input
                theme={theme}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>
                <FaIdCard />
                Email Address *
              </Label>
              <Input
                theme={theme}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>
                <FaPhone />
                Phone Number *
              </Label>
              <Input
                theme={theme}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>
                <FaIdCard />
                License Number *
              </Label>
              <Input
                theme={theme}
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                placeholder="Enter your license number"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>
                <FaCalendarAlt />
                Preferred Date *
              </Label>
              <Input
                theme={theme}
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>
                <FaClock />
                Preferred Time *
              </Label>
              <Select
                theme={theme}
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>
                <FaMapMarkerAlt />
                Preferred Location *
              </Label>
              <Select
                theme={theme}
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">Select location</option>
                {showroomsData?.map(showroom => (
                  <option key={showroom._id} value={showroom._id}>
                    {showroom.name} - {showroom.address.city}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>
                <FaStar />
                Riding Experience *
              </Label>
              <Select
                theme={theme}
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
                <option value="expert">Expert (5+ years)</option>
              </Select>
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label theme={theme}>
              Additional Notes
            </Label>
            <TextArea
              theme={theme}
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any specific requirements or questions about the test ride..."
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="spinner" style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Booking Test Ride...
              </>
            ) : (
              <>
                <FaCheckCircle />
                Book Test Ride
              </>
            )}
          </SubmitButton>
        </form>
      </BookingForm>

      <BenefitsSection theme={theme}>
        <BenefitsTitle theme={theme}>Why Book a Test Ride?</BenefitsTitle>
        <BenefitsGrid>
          <BenefitItem theme={theme}>
            <BenefitIcon>
              <FaMotorcycle />
            </BenefitIcon>
            <BenefitText>
              <BenefitTitle theme={theme}>Real Experience</BenefitTitle>
              <BenefitDescription theme={theme}>
                Feel the bike's performance, comfort, and handling in real conditions
              </BenefitDescription>
            </BenefitText>
          </BenefitItem>

          <BenefitItem theme={theme}>
            <BenefitIcon>
              <FaShieldAlt />
            </BenefitIcon>
            <BenefitText>
              <BenefitTitle theme={theme}>Safe & Insured</BenefitTitle>
              <BenefitDescription theme={theme}>
                All test rides are fully insured with safety gear provided
              </BenefitDescription>
            </BenefitText>
          </BenefitItem>

          <BenefitItem theme={theme}>
            <BenefitIcon>
              <FaStar />
            </BenefitIcon>
            <BenefitText>
              <BenefitTitle theme={theme}>Expert Guidance</BenefitTitle>
              <BenefitDescription theme={theme}>
                Get professional advice from our experienced team
              </BenefitDescription>
            </BenefitText>
          </BenefitItem>

          <BenefitItem theme={theme}>
            <BenefitIcon>
              <FaCheckCircle />
            </BenefitIcon>
            <BenefitText>
              <BenefitTitle theme={theme}>No Obligation</BenefitTitle>
              <BenefitDescription theme={theme}>
                Test ride with no pressure to buy - make an informed decision
              </BenefitDescription>
            </BenefitText>
          </BenefitItem>
        </BenefitsGrid>
      </BenefitsSection>
    </Container>
  );
};

export default BookTestRide;