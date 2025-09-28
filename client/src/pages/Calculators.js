import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalculator, FaGasPump, FaChartLine, FaRupeeSign } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
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

const CalculatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CalculatorCard = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.1);
`;

const CalculatorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CalculatorIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const CalculatorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .currency-symbol {
    color: #6b7280;
    font-weight: 600;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
`;

const ResultTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ResultValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ResultSubtext = styled.p`
  opacity: 0.9;
  font-size: 0.875rem;
`;

const BreakdownCard = styled.div`
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
    font-weight: 600;
    border-top: 1px solid #e5e7eb;
    padding-top: 0.5rem;
  }
`;

const InfoSection = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 3rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  p {
    color: #6b7280;
    line-height: 1.6;
  }
`;

const Calculators = () => {
  const [emiData, setEmiData] = useState({
    principal: '',
    interestRate: '',
    tenure: '',
    downPayment: ''
  });

  const [fuelData, setFuelData] = useState({
    distance: '',
    mileage: '',
    fuelPrice: '',
    fuelType: 'petrol'
  });

  const calculateEMI = () => {
    const principal = parseFloat(emiData.principal) - parseFloat(emiData.downPayment || 0);
    const rate = parseFloat(emiData.interestRate) / 100 / 12;
    const tenure = parseFloat(emiData.tenure) * 12;

    if (!principal || !rate || !tenure) return null;

    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    return {
      emi: emi,
      totalAmount: totalAmount,
      totalInterest: totalInterest,
      principal: principal
    };
  };

  const calculateFuelCost = () => {
    const distance = parseFloat(fuelData.distance);
    const mileage = parseFloat(fuelData.mileage);
    const fuelPrice = parseFloat(fuelData.fuelPrice);

    if (!distance || !mileage || !fuelPrice) return null;

    const fuelRequired = distance / mileage;
    const totalCost = fuelRequired * fuelPrice;

    return {
      fuelRequired: fuelRequired,
      totalCost: totalCost,
      costPerKm: totalCost / distance
    };
  };

  const emiResult = calculateEMI();
  const fuelResult = calculateFuelCost();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Container>
      <Header>
        <Title>🧮 Smart Calculators</Title>
        <Subtitle>Make informed decisions with our AI-powered EMI and fuel cost calculators</Subtitle>
      </Header>

      <CalculatorsGrid>
        <CalculatorCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CalculatorHeader>
            <CalculatorIcon>
              <FaCalculator />
            </CalculatorIcon>
            <CalculatorTitle>EMI Calculator</CalculatorTitle>
          </CalculatorHeader>

          <FormGroup>
            <label>Vehicle Price (₹)</label>
            <div className="input-group">
              <span className="currency-symbol">₹</span>
              <input
                type="number"
                placeholder="Enter vehicle price"
                value={emiData.principal}
                onChange={(e) => setEmiData({ ...emiData, principal: e.target.value })}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>Down Payment (₹)</label>
            <div className="input-group">
              <span className="currency-symbol">₹</span>
              <input
                type="number"
                placeholder="Enter down payment"
                value={emiData.downPayment}
                onChange={(e) => setEmiData({ ...emiData, downPayment: e.target.value })}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>Interest Rate (% per annum)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Enter interest rate"
              value={emiData.interestRate}
              onChange={(e) => setEmiData({ ...emiData, interestRate: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Loan Tenure (years)</label>
            <input
              type="number"
              placeholder="Enter loan tenure"
              value={emiData.tenure}
              onChange={(e) => setEmiData({ ...emiData, tenure: e.target.value })}
            />
          </FormGroup>

          {emiResult && (
            <ResultCard>
              <ResultTitle>Monthly EMI</ResultTitle>
              <ResultValue>{formatCurrency(emiResult.emi)}</ResultValue>
              <ResultSubtext>per month for {emiData.tenure} years</ResultSubtext>

              <BreakdownCard>
                <BreakdownItem>
                  <span>Principal Amount:</span>
                  <span>{formatCurrency(emiResult.principal)}</span>
                </BreakdownItem>
                <BreakdownItem>
                  <span>Total Interest:</span>
                  <span>{formatCurrency(emiResult.totalInterest)}</span>
                </BreakdownItem>
                <BreakdownItem>
                  <span>Total Amount:</span>
                  <span>{formatCurrency(emiResult.totalAmount)}</span>
                </BreakdownItem>
              </BreakdownCard>
            </ResultCard>
          )}
        </CalculatorCard>

        <CalculatorCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CalculatorHeader>
            <CalculatorIcon>
              <FaGasPump />
            </CalculatorIcon>
            <CalculatorTitle>Fuel Cost Calculator</CalculatorTitle>
          </CalculatorHeader>

          <FormGroup>
            <label>Distance (km)</label>
            <input
              type="number"
              placeholder="Enter distance"
              value={fuelData.distance}
              onChange={(e) => setFuelData({ ...fuelData, distance: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Mileage (km/liter)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Enter mileage"
              value={fuelData.mileage}
              onChange={(e) => setFuelData({ ...fuelData, mileage: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Fuel Price (₹/liter)</label>
            <div className="input-group">
              <span className="currency-symbol">₹</span>
              <input
                type="number"
                step="0.1"
                placeholder="Enter fuel price"
                value={fuelData.fuelPrice}
                onChange={(e) => setFuelData({ ...fuelData, fuelPrice: e.target.value })}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>Fuel Type</label>
            <select
              value={fuelData.fuelType}
              onChange={(e) => setFuelData({ ...fuelData, fuelType: e.target.value })}
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </FormGroup>

          {fuelResult && (
            <ResultCard>
              <ResultTitle>Total Fuel Cost</ResultTitle>
              <ResultValue>{formatCurrency(fuelResult.totalCost)}</ResultValue>
              <ResultSubtext>for {fuelData.distance} km journey</ResultSubtext>

              <BreakdownCard>
                <BreakdownItem>
                  <span>Fuel Required:</span>
                  <span>{fuelResult.fuelRequired.toFixed(2)} liters</span>
                </BreakdownItem>
                <BreakdownItem>
                  <span>Cost per km:</span>
                  <span>{formatCurrency(fuelResult.costPerKm)}</span>
                </BreakdownItem>
                <BreakdownItem>
                  <span>Fuel Price:</span>
                  <span>{formatCurrency(fuelData.fuelPrice)}/liter</span>
                </BreakdownItem>
              </BreakdownCard>
            </ResultCard>
          )}
        </CalculatorCard>
      </CalculatorsGrid>

      <InfoSection>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e293b' }}>
          Why Use Our Calculators?
        </h2>
        <InfoGrid>
          <InfoCard>
            <FaChartLine style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1rem' }} />
            <h3>Accurate Calculations</h3>
            <p>Get precise EMI and fuel cost calculations to plan your budget effectively.</p>
          </InfoCard>
          <InfoCard>
            <FaRupeeSign style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1rem' }} />
            <h3>Financial Planning</h3>
            <p>Make informed decisions about vehicle purchases with detailed cost breakdowns.</p>
          </InfoCard>
          <InfoCard>
            <FaCalculator style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1rem' }} />
            <h3>Easy to Use</h3>
            <p>Simple interface with instant results to help you compare different options.</p>
          </InfoCard>
        </InfoGrid>
      </InfoSection>
    </Container>
  );
};

export default Calculators;
