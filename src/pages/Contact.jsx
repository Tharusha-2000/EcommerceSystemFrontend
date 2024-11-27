import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Overlay for transparency */}
      <div className="contact-overlay"></div>

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
        <div className="contact-social">
          <p>Connect with us:</p>
          <div className="social-icons">
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
              <img src="whatsapp-icon.png" alt="WhatsApp" />
            </a>
            <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer">
              <img src="facebook-icon.png" alt="Facebook" />
            </a>
            <a href="https://instagram.com/your-page" target="_blank" rel="noopener noreferrer">
              <img src="instagram-icon.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
