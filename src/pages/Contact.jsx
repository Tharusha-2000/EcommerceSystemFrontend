import React from "react";
import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaClock } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Overlay for transparency */}
      <div className="contact-overlay"></div>

      {/* Main container with flex layout */}
      <div className="contact-content">

        
        {/* Left-side section */}
        <div className="left-section">

        <div className="contact-heading">
            <h2>Get In Touch</h2>
           
          </div>
          <div className="info-item">
  {/* Centered content */}
  <div className="info-row">
    <FaMapMarkerAlt size={30} className="info-icon" />
    <p className="info-title">Location</p>
  </div>
  <p className="info-details">No 121, Kandy Roday, Kadawtha</p>
</div>

<div className="info-item">
  <div className="info-row">
    <FaPhoneAlt size={30} className="info-icon" />
    <p className="info-title">Phone</p>
  </div>
  <p className="info-details">0332273580</p>
</div>

<div className="info-item">
  {/* Icon on the left */}
  <div className="info-row">
    <IoMdMail size={30} className="info-icon" />
    <p className="info-title">Email</p>
  </div>
  <p className="info-details">mossamelt@gmail.com</p>
</div>

<div className="info-item">
  <div className="info-row">
    <FaClock size={30} className="info-icon" />
    <p className="info-title">Open Houres</p>
  </div>
  <p className="info-details">9.00 am - 12.00 pm</p>
</div>



          <div className="social-box">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} style={{ color: "#4267B2", marginRight: "15px" }} />
              </a>
              <a href="https://instagram.com/your-page" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} style={{ color: "#E1306C", marginRight: "15px" }} />
              </a>
              <a href="https://twitter.com/your-page" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={30} style={{ color: "#1DA1F2", marginRight: "15px" }} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact form container */}
        <div className="contact-container">
          <div className="contact-heading">
            <h2>Contact Us</h2>
            <p>
              For inquiries, order issues, or collaboration opportunities, reach out to us!
            </p>
          </div>
          <div className="contact-form">
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message" rows="4" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
