import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useWishlist } from '../contexts/WishlistContext';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const LikeButtonContainer = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: ${props => props.isLiked 
    ? 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  color: ${props => props.isLiked ? 'white' : '#64748b'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  
  &:hover {
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 8px 25px ${props => props.isLiked 
      ? 'rgba(255, 107, 107, 0.4)'
      : 'rgba(0, 0, 0, 0.2)'};
    background: ${props => props.isLiked 
      ? 'linear-gradient(135deg, #ff5252 0%, #ff1744 100%)'
      : 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)'};
    color: white;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &.liked {
    animation: ${pulse} 0.6s ease-in-out;
  }
`;

const LikeButton = ({ vehicle, size = 'normal' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(vehicle._id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(vehicle);
  };

  return (
    <LikeButtonContainer
      isLiked={isLiked}
      onClick={handleClick}
      className={isLiked ? 'liked' : ''}
      aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
      title={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <FaHeart />
    </LikeButtonContainer>
  );
};

export default LikeButton;
