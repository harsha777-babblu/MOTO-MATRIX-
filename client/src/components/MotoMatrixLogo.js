import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
`;

const LogoIcon = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const HexagonFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(30deg);
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #3b82f6, #06b6d4, #10b981);
    clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
    box-shadow: 
      0 0 20px rgba(59, 130, 246, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 85%;
    background: linear-gradient(45deg, #1e3a8a, #0f172a);
    clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
  }
`;

const LetterM = styled.div`
  position: relative;
  z-index: 2;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: 'M';
    font-size: 2rem;
    font-weight: 900;
    background: linear-gradient(45deg, #3b82f6 0%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.3));
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%),
      linear-gradient(0deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%);
    border-radius: 4px;
    animation: circuitPulse 2s ease-in-out infinite;
  }
  
  @keyframes circuitPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
`;

const MainText = styled.div`
  font-size: 1.8rem;
  font-weight: 900;
  background: linear-gradient(45deg, #3b82f6 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SubText = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: -2px;
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const CircuitLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: linear-gradient(45deg, #3b82f6, #10b981);
    opacity: 0.3;
  }
  
  &::before {
    top: 20%;
    left: 10%;
    width: 2px;
    height: 60%;
    animation: circuitFlow 3s ease-in-out infinite;
  }
  
  &::after {
    top: 10%;
    right: 20%;
    width: 60%;
    height: 2px;
    animation: circuitFlow 3s ease-in-out infinite reverse;
  }
  
  @keyframes circuitFlow {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.6; }
  }
`;

const MotoMatrixLogo = ({ size = 'medium', showText = true, className = '' }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return { icon: '40px', text: '1.2rem' };
      case 'large': return { icon: '80px', text: '2.5rem' };
      default: return { icon: '60px', text: '1.8rem' };
    }
  };

  const sizes = getSize();

  return (
    <LogoContainer className={className}>
      <LogoIcon style={{ width: sizes.icon, height: sizes.icon }}>
        <HexagonFrame />
        <LetterM />
        <CircuitLines />
      </LogoIcon>
      {showText && (
        <LogoText>
          <MainText style={{ fontSize: sizes.text }}>
            MOTO MATRIX
          </MainText>
          <SubText>ECOSYSTEM</SubText>
        </LogoText>
      )}
    </LogoContainer>
  );
};

export default MotoMatrixLogo;

