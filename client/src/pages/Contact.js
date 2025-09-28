import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset, FaWhatsapp } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
  }

  .content {
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6b7280;
      margin: 0;
    }
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  input, textarea, select {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 1rem;
  text-align: center;
  margin-top: 4rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.125rem;
    opacity: 0.9;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Container>
      <Header>
        <Title>📞 Contact Moto Matrix</Title>
        <Subtitle>
          Get in touch with our AI-powered support team for any queries, premium support, or business partnerships
        </Subtitle>
      </Header>

      <ContactGrid>
        <ContactInfo>
          <h2>Get in Touch</h2>
          
          <ContactItem>
            <div className="icon" style={{ background: '#3b82f6' }}>
              <FaPhone />
            </div>
            <div className="content">
              <h3>Phone Support</h3>
              <p>+91 98765 43210<br />Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-6PM</p>
            </div>
          </ContactItem>

          <ContactItem>
            <div className="icon" style={{ background: '#10b981' }}>
              <FaWhatsapp />
            </div>
            <div className="content">
              <h3>WhatsApp Support</h3>
              <p>+91 98765 43210<br />24/7 Instant Support</p>
            </div>
          </ContactItem>

          <ContactItem>
            <div className="icon" style={{ background: '#f59e0b' }}>
              <FaEnvelope />
            </div>
            <div className="content">
              <h3>Email Support</h3>
              <p>support@motomatrix.com<br />info@motomatrix.com</p>
            </div>
          </ContactItem>

          <ContactItem>
            <div className="icon" style={{ background: '#ef4444' }}>
              <FaMapMarkerAlt />
            </div>
            <div className="content">
              <h3>Head Office</h3>
              <p>123 Vehicle Street, Auto City<br />Mumbai, Maharashtra 400001</p>
            </div>
          </ContactItem>

          <ContactItem>
            <div className="icon" style={{ background: '#8b5cf6' }}>
              <FaHeadset />
            </div>
            <div className="content">
              <h3>Live Chat</h3>
              <p>Available 24/7<br />Instant customer support</p>
            </div>
          </ContactItem>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <h2>Send us a Message</h2>
          
          <FormGroup>
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="subject">Subject *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="sales">Sales Inquiry</option>
              <option value="partnership">Business Partnership</option>
              <option value="feedback">Feedback</option>
              <option value="complaint">Complaint</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us how we can help you..."
            />
          </FormGroup>

          <SubmitButton type="submit">
            Send Message
          </SubmitButton>
        </ContactForm>
      </ContactGrid>

      <StatsSection>
        <h2>Why Choose Moto Matrix?</h2>
        <StatsGrid>
          <StatItem>
            <h3>10K+</h3>
            <p>Vehicles Listed</p>
          </StatItem>
          <StatItem>
            <h3>500+</h3>
            <p>Partner Showrooms</p>
          </StatItem>
          <StatItem>
            <h3>50+</h3>
            <p>Trusted Brands</p>
          </StatItem>
          <StatItem>
            <h3>1M+</h3>
            <p>Happy Customers</p>
          </StatItem>
        </StatsGrid>
      </StatsSection>
    </Container>
  );
};

export default Contact;
