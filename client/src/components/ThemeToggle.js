import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ToggleContainer = styled.button`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${props => props.isDark ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.isDark ? '32px' : '2px'};
  width: 26px;
  height: 26px;
  background: ${props => props.isDark ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'};
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${props => props.isDark ? '#fbbf24' : '#f59e0b'};
  
  ${ToggleContainer}:hover & {
    transform: scale(1.1);
  }
`;

const IconContainer = styled.div`
  animation: ${props => props.isAnimating ? rotate : 'none'} 0.5s ease-in-out;
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <ToggleContainer 
      isDark={isDarkMode} 
      onClick={handleToggle}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <ToggleSlider isDark={isDarkMode}>
        <IconContainer isAnimating={isAnimating}>
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </IconContainer>
      </ToggleSlider>
    </ToggleContainer>
  );
};

export default ThemeToggle;
