import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUpload, FaCamera, FaCheckCircle, FaRupeeSign, FaCalendarAlt, FaCog, FaShieldAlt } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
  }
`;

const ImageUploadSection = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  background: #f9fafb;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #10b981;
    background: #f0fdf4;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.p`
  color: #9ca3af;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BenefitsSection = styled.div`
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
`;

const BenefitsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
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
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const BenefitIcon = styled.div`
  font-size: 1.5rem;
  color: #10b981;
`;

const BenefitText = styled.div`
  h4 {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.9rem;
  }
`;

const SellBike = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    location: '',
    condition: '',
    fuelType: '',
    description: '',
    contactNumber: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your bike listing has been submitted successfully! We will review and publish it within 24 hours.');
    }, 2000);
  };

  return (
    <Container>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>⚡ Sell Your Bike</Title>
          <Subtitle>
            Get the best price for your bike. List it on Moto Matrix - India's most advanced two-wheeler ecosystem and reach millions of potential buyers with AI-powered matching.
          </Subtitle>
        </motion.div>
      </Header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <Label>Brand *</Label>
                <Select name="brand" value={formData.brand} onChange={handleInputChange} required>
                  <option value="">Select Brand</option>
                  <option value="Honda">Honda</option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="TVS">TVS</option>
                  <option value="Hero">Hero</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="KTM">KTM</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Other">Other</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Model *</Label>
                <Input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., Activa 6G, Pulsar 150"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Year of Purchase *</Label>
                <Select name="year" value={formData.year} onChange={handleInputChange} required>
                  <option value="">Select Year</option>
                  {Array.from({ length: 15 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Mileage (km) *</Label>
                <Input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="e.g., 15000"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Expected Price (₹) *</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 45000"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Location *</Label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Mumbai, Maharashtra"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Condition *</Label>
                <Select name="condition" value={formData.condition} onChange={handleInputChange} required>
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Fuel Type *</Label>
                <Select name="fuelType" value={formData.fuelType} onChange={handleInputChange} required>
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="CNG">CNG</option>
                </Select>
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your bike, any modifications, service history, etc."
              />
            </FormGroup>

            <FormGrid>
              <FormGroup>
                <Label>Contact Number *</Label>
                <Input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <Label>Upload Photos (Max 10 images)</Label>
              <ImageUploadSection>
                <UploadIcon>
                  <FaUpload />
                </UploadIcon>
                <UploadText>Click to upload or drag and drop</UploadText>
                <UploadSubtext>PNG, JPG up to 10MB each</UploadSubtext>
              </ImageUploadSection>
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : '⚡ List on Moto Matrix'}
            </SubmitButton>
          </form>
        </FormContainer>

        <BenefitsSection>
          <BenefitsTitle>Why Sell on Moto Matrix?</BenefitsTitle>
          <BenefitsGrid>
            <BenefitItem>
              <BenefitIcon>
                <FaRupeeSign />
              </BenefitIcon>
              <BenefitText>
                <h4>Best Price Guarantee</h4>
                <p>Get competitive offers from verified buyers</p>
              </BenefitText>
            </BenefitItem>

            <BenefitItem>
              <BenefitIcon>
                <FaShieldAlt />
              </BenefitIcon>
              <BenefitText>
                <h4>Safe & Secure</h4>
                <p>Verified buyers and secure payment options</p>
              </BenefitText>
            </BenefitItem>

            <BenefitItem>
              <BenefitIcon>
                <FaCheckCircle />
              </BenefitIcon>
              <BenefitText>
                <h4>Quick Sale</h4>
                <p>Reach thousands of buyers in your area</p>
              </BenefitText>
            </BenefitItem>

            <BenefitItem>
              <BenefitIcon>
                <FaCog />
              </BenefitIcon>
              <BenefitText>
                <h4>Free Listing</h4>
                <p>No listing fees, pay only when you sell</p>
              </BenefitText>
            </BenefitItem>
          </BenefitsGrid>
        </BenefitsSection>
      </motion.div>
    </Container>
  );
};

export default SellBike;
