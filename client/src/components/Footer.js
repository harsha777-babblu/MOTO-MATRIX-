import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaWhatsapp,
  FaHeadset,
  FaShieldAlt,
  FaAward,
  FaUsers
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
  padding: 5rem 0 2rem;
  margin-top: 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #059669, #047857, #065f46);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 3.5rem;
  margin-bottom: 3.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #f1f5f9;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #10b981, #059669);
    }
  }

  p {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.75rem;
  }

  a {
    color: #cbd5e1;
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #10b981;
      transform: translateX(4px);
    }
  }
`;

const CompanyInfo = styled(FooterSection)`
  .logo {
    font-size: 1.8rem;
    font-weight: 900;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
  }

  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .stat-item {
    text-align: center;
    padding: 1.2rem;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 0.75rem;
    border: 1px solid rgba(16, 185, 129, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(16, 185, 129, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
    }
  }

  .stat-number {
    font-size: 1.6rem;
    font-weight: 800;
    color: #10b981;
    display: block;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
  }

  .stat-label {
    font-size: 0.875rem;
    color: #cbd5e1;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
  font-size: 0.875rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #94a3b8;
  font-size: 0.875rem;
`;

const TrustBadges = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #cbd5e1;
  font-size: 0.875rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <CompanyInfo>
            <div className="logo">
              ⚡ Moto Matrix
            </div>
            <p>
              The Ultimate Two-Wheeler Ecosystem. Connect with 1000+ smart showrooms 
              and discover your perfect ride from 25,000+ premium vehicles with AI-powered recommendations.
            </p>
            
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">25K+</span>
                <span className="stat-label">Premium Vehicles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1K+</span>
                <span className="stat-label">Smart Showrooms</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5M+</span>
                <span className="stat-label">Matrix Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Global Brands</span>
              </div>
            </div>

            <SocialLinks>
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </SocialLinks>
          </CompanyInfo>

          <FooterSection>
            <h3>🚀 Quick Links</h3>
            <ul>
              <li><Link to="/vehicles">🏍️ Browse Vehicles</Link></li>
              <li><Link to="/sell-bike">⚡ Sell Your Bike</Link></li>
              <li><Link to="/new-launches">🆕 New Launches</Link></li>
              <li><Link to="/showrooms">📍 Find Showrooms</Link></li>
              <li><Link to="/compare">⚖️ Compare Vehicles</Link></li>
              <li><Link to="/calculators">🧮 Smart Calculators</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>🏍️ Vehicle Categories</h3>
            <ul>
              <li><Link to="/vehicles?type=Bike">🏍️ Motorcycles</Link></li>
              <li><Link to="/vehicles?type=Scooter">🛵 Scooters</Link></li>
              <li><Link to="/vehicles?type=Electric Vehicle">⚡ Electric Vehicles</Link></li>
              <li><Link to="/vehicles?fuelType=Petrol">⛽ Petrol Vehicles</Link></li>
              <li><Link to="/vehicles?fuelType=Electric">🔋 Electric Vehicles</Link></li>
              <li><Link to="/vehicles?fuelType=CNG">🌱 CNG Vehicles</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>📞 Contact Info</h3>
            <ContactInfo>
              <FaPhone />
              <span>+91 98765 43210</span>
            </ContactInfo>
            <ContactInfo>
              <FaWhatsapp />
              <span>+91 98765 43210</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>support@motomatrix.com</span>
            </ContactInfo>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>Mumbai, Maharashtra</span>
            </ContactInfo>
            <ContactInfo>
              <FaHeadset />
              <span>24/7 AI-Powered Support</span>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            <p>&copy; 2024 Moto Matrix. All rights reserved. | Made with ⚡ in India</p>
          </Copyright>
          
          <TrustBadges>
            <TrustBadge>
              <FaShieldAlt />
              <span>SSL Secured</span>
            </TrustBadge>
            <TrustBadge>
              <FaAward />
              <span>Trusted Platform</span>
            </TrustBadge>
            <TrustBadge>
              <FaUsers />
              <span>1M+ Users</span>
            </TrustBadge>
          </TrustBadges>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
