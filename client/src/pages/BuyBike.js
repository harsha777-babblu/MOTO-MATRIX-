import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { 
  FaCreditCard, 
  FaShieldAlt, 
  FaTruck, 
  FaCheckCircle,
  FaArrowLeft,
  FaMotorcycle,
  FaUser,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaCalculator,
  FaGift,
  FaStar,
  FaLock
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

const PurchaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const PurchaseForm = styled(motion.div)`
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
`;

const OrderSummary = styled(motion.div)`
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
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const VehicleCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(15, 23, 42, 0.5)'
    : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 1rem;
  margin-bottom: 2rem;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const VehicleImage = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const VehicleDetails = styled.div`
  flex: 1;
`;

const VehicleName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 0.5rem;
`;

const VehicleSpecs = styled.p`
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const VehiclePrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

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

const PaymentMethod = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PaymentOption = styled.div`
  padding: 1rem;
  border: 2px solid ${props => props.selected 
    ? '#10b981' 
    : props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 0.75rem;
  background: ${props => props.selected 
    ? 'rgba(16, 185, 129, 0.1)' 
    : props.theme === 'dark' 
      ? 'rgba(15, 23, 42, 0.5)' 
      : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: #10b981;
  }
`;

const PaymentIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.selected ? '#10b981' : props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
`;

const PaymentLabel = styled.div`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
`;

const PriceBreakdown = styled.div`
  margin-bottom: 2rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};

  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 1.1rem;
    color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  }
`;

const PriceLabel = styled.span`
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
`;

const PriceValue = styled.span`
  color: ${props => props.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
  font-weight: 600;
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
`;

const PurchaseButton = styled(motion.button)`
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

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(15, 23, 42, 0.5)'
    : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 0.75rem;
  margin-top: 1rem;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)'};
`;

const SecurityText = styled.span`
  color: ${props => props.theme === 'dark' ? '#cbd5e1' : '#6b7280'};
  font-size: 0.9rem;
`;

const BuyBike = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state?.vehicle;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cash',
    financing: 'full',
    downPayment: '',
    emiMonths: '12'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

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

  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const calculatePrice = () => {
    if (!vehicle) return { base: 0, total: 0 };
    
    const basePrice = vehicle.price || 0;
    const insurance = basePrice * 0.05; // 5% insurance
    const registration = basePrice * 0.02; // 2% registration
    const total = basePrice + insurance + registration;
    
    return { base: basePrice, insurance, registration, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsPurchased(true);
      setTimeout(() => {
        navigate('/vehicles');
      }, 5000);
    } catch (error) {
      console.error('Error purchasing bike:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!vehicle) {
    return (
      <Container theme={theme}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
            marginBottom: '1rem'
          }}>
            No Vehicle Selected
          </h2>
          <p style={{ 
            color: theme === 'dark' ? '#cbd5e1' : '#6b7280',
            marginBottom: '2rem'
          }}>
            Please select a vehicle to purchase.
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
            Browse Vehicles
          </motion.button>
        </div>
      </Container>
    );
  }

  if (isPurchased) {
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
            Purchase Successful!
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: theme === 'dark' ? '#cbd5e1' : '#6b7280',
            marginBottom: '2rem'
          }}>
            Your {vehicle.name} has been ordered successfully. We'll contact you within 24 hours for delivery details.
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

  const prices = calculatePrice();

  return (
    <Container theme={theme}>
      <BackButton theme={theme} onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Back
      </BackButton>

      <Header>
        <Title theme={theme}>
          <FaCreditCard />
          Buy Your Bike
        </Title>
        <Subtitle theme={theme}>
          Complete your purchase with secure payment and fast delivery options.
        </Subtitle>
      </Header>

      <PurchaseGrid>
        <PurchaseForm
          theme={theme}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle theme={theme}>
                <FaUser />
                Personal Information
              </SectionTitle>
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
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionTitle theme={theme}>
                <FaMapMarkerAlt />
                Delivery Address
              </SectionTitle>
              <FormGrid>
                <FormGroup style={{ gridColumn: '1 / -1' }}>
                  <Label theme={theme}>Address *</Label>
                  <Input
                    theme={theme}
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>City *</Label>
                  <Input
                    theme={theme}
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Pincode *</Label>
                  <Input
                    theme={theme}
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter pincode"
                    required
                  />
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionTitle theme={theme}>
                <FaCreditCard />
                Payment Method
              </SectionTitle>
              <PaymentMethod>
                <PaymentOption
                  theme={theme}
                  selected={formData.paymentMethod === 'cash'}
                  onClick={() => handlePaymentMethodChange('cash')}
                >
                  <PaymentIcon theme={theme} selected={formData.paymentMethod === 'cash'}>
                    💰
                  </PaymentIcon>
                  <PaymentLabel theme={theme}>Cash Payment</PaymentLabel>
                </PaymentOption>

                <PaymentOption
                  theme={theme}
                  selected={formData.paymentMethod === 'card'}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  <PaymentIcon theme={theme} selected={formData.paymentMethod === 'card'}>
                    💳
                  </PaymentIcon>
                  <PaymentLabel theme={theme}>Credit/Debit Card</PaymentLabel>
                </PaymentOption>

                <PaymentOption
                  theme={theme}
                  selected={formData.paymentMethod === 'emi'}
                  onClick={() => handlePaymentMethodChange('emi')}
                >
                  <PaymentIcon theme={theme} selected={formData.paymentMethod === 'emi'}>
                    📊
                  </PaymentIcon>
                  <PaymentLabel theme={theme}>EMI</PaymentLabel>
                </PaymentOption>
              </PaymentMethod>

              {formData.paymentMethod === 'emi' && (
                <FormGrid>
                  <FormGroup>
                    <Label theme={theme}>Down Payment (₹)</Label>
                    <Input
                      theme={theme}
                      type="number"
                      name="downPayment"
                      value={formData.downPayment}
                      onChange={handleInputChange}
                      placeholder="Enter down payment amount"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label theme={theme}>EMI Duration</Label>
                    <Select
                      theme={theme}
                      name="emiMonths"
                      value={formData.emiMonths}
                      onChange={handleInputChange}
                    >
                      <option value="12">12 Months</option>
                      <option value="24">24 Months</option>
                      <option value="36">36 Months</option>
                      <option value="48">48 Months</option>
                      <option value="60">60 Months</option>
                    </Select>
                  </FormGroup>
                </FormGrid>
              )}
            </FormSection>

            <PurchaseButton
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
                  Processing Purchase...
                </>
              ) : (
                <>
                  <FaLock />
                  Complete Purchase
                </>
              )}
            </PurchaseButton>
          </form>
        </PurchaseForm>

        <OrderSummary
          theme={theme}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VehicleCard theme={theme}>
            <VehicleImage 
              src={vehicle.images?.[0] || '/api/placeholder/120/90'} 
              alt={vehicle.name}
            />
            <VehicleDetails>
              <VehicleName theme={theme}>{vehicle.name}</VehicleName>
              <VehicleSpecs theme={theme}>
                {vehicle.brand} • {vehicle.model}
              </VehicleSpecs>
              <VehiclePrice>₹{vehicle.price?.toLocaleString()}</VehiclePrice>
            </VehicleDetails>
          </VehicleCard>

          <PriceBreakdown>
            <PriceRow theme={theme}>
              <PriceLabel theme={theme}>Base Price</PriceLabel>
              <PriceValue theme={theme}>₹{prices.base.toLocaleString()}</PriceValue>
            </PriceRow>
            <PriceRow theme={theme}>
              <PriceLabel theme={theme}>Insurance (5%)</PriceLabel>
              <PriceValue theme={theme}>₹{prices.insurance.toLocaleString()}</PriceValue>
            </PriceRow>
            <PriceRow theme={theme}>
              <PriceLabel theme={theme}>Registration (2%)</PriceLabel>
              <PriceValue theme={theme}>₹{prices.registration.toLocaleString()}</PriceValue>
            </PriceRow>
            <PriceRow theme={theme}>
              <PriceLabel theme={theme}>Total Amount</PriceLabel>
              <TotalPrice>₹{prices.total.toLocaleString()}</TotalPrice>
            </PriceRow>
          </PriceBreakdown>

          <SecurityBadge theme={theme}>
            <FaLock style={{ color: '#10b981' }} />
            <SecurityText theme={theme}>
              Your payment is secure and encrypted
            </SecurityText>
          </SecurityBadge>
        </OrderSummary>
      </PurchaseGrid>
    </Container>
  );
};

export default BuyBike;
