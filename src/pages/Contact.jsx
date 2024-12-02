import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
// import FF from '../utils/Images/FF.png';
// import { contact } from "../api/";


const Container = styled.div`
  display: flex;
  flex-direction: column; /* Stack form and icons vertically on mobile */
  justify-content: center;
  align-items: center; /* Center vertically */
  /* Background Image with smooth gradient overlay */
  background: linear-gradient(
      to bottom, 
      rgba(255, 255, 255, 0.5),  /* Start with a white ash color */
      rgba(255, 255, 255, 0.5)   /* Gradually fade to transparent */
    ),
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  padding: 40px;
  @media (max-width: 960px) {
    padding: 20px;
  }
`;

const Wrapper = styled.div`

  display: flex;
  
  flex-direction: row; /* Row direction on desktop */
  align-items: flex-start; /* Align items to the top */
  width: 100%;
  max-width: 1400px;
  gap: 20px;
  @media (max-width: 600px) {
    flex-direction: column; /* Column direction on mobile */
    align-items: center; /* Center items on mobile */
  }
`;



const RightColumn = styled.div`
  display: flex;
  flex-direction: column; /* Stack contact info and social icons vertically */
  justify-content: center;
  align-items: center;
  flex: 1; /* Allow it to grow */
  margin-top: 30px; /* Move the content a bit lower */
  margin-right: 50px;
  @media (max-width: 600px) {
    width: 100%; /* Full width on mobile */
    margin-top: 20px; /* Add space above social icons on mobile */
  }

`;

const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2; /* Allow it to grow more */
  @media (max-width: 600px) {
    width: 100%; /* Full width on mobile */
  }
`;

const SocialIcons = styled.div`
margin-top: 10px;
  display: flex;
  justify-content: center; /* Center icons horizontally */
  gap: 20px;

`;

const SocialIcon = styled.a`
  font-size: 32px;
  color: #3b5998; /* Default color for Facebook */
  transition: color 0.3s;
  
  &:hover {
    color: #1d3a91; /* Darker shade on hover */
  }

  &:nth-child(2) {
    color: #e4405f; /* Instagram color */
    
    &:hover {
      color: #d82c4d; /* Darker Instagram shade on hover */
    }
  }
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 400px; /* Reduced size */
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to bottom, 
    rgba(255, 255, 255, 0.9),  /* Start with a white ash color */
    rgba(255, 255, 255, 0.9)   /* Gradually fade to transparent */
  );

  border: 1px solid rgba(0, 0, 0, 0.125); /* Changed border color to light gray */
  padding: 32px;
  border-radius: 22px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 24px; /* Changed box shadow color to black */
  gap: 12px;
  @media (max-width: 960px) {
    background: linear-gradient(
        to bottom, 
        rgba(255, 255, 255, 0.6),  /* Start with a white ash color */
        rgba(255, 255, 255, 0.6)   /* Gradually fade to transparent */
      );
   
  }


`;

const ContactTitle = styled.div`
  font-size: 60px;
  margin-bottom: 16px;
  color:#000;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 960px) {
    font-size: 26px;
   
  }
 
`;

const ContactInput = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 12px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 12px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const ContactInfo = styled.div`
font-size: 21px;
  text-align: center;
  margin-bottom: 20px; /* Space between contact info and social icons */
  color: #000;
  @media (max-width: 960px) {
    font-size: 16px;
    margin-bottom: 10px; /* Less space on mobile */
  }
`;

const Contact = () => {
  const form = useRef();
  const [from_name, setFromName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
    const formData = { from_name, subject, message };
    try{
    //   const res = await contact( formData);
      // console.log(res); 
    }catch(err) {
      alert(err);
    }
  };


  return (
    <Container>
      <Wrapper>
        {/* Left column for contact information and social media icons */}
        <LeftColumn>
        <ContactForm ref={form} onSubmit={handleSubmit}>
           
            <ContactInput
              placeholder="Your Name"
              name="from_name"
              value={from_name}
              onChange={(e) => setFromName(e.target.value)}
            />
            <ContactInput
              placeholder="Subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <ContactInputMessage
              placeholder="Message"
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <ContactButton type="submit" value="Send" />
          </ContactForm>
        
        </LeftColumn>

        {/* Right column for form */}
        <RightColumn>
         

        <ContactTitle>Contact Us</ContactTitle>

        <ContactInfo>
            <div>For questions, technical assistance, or collaboration opportunities:</div>
            
          </ContactInfo>

          <SocialIcons>
            <SocialIcon href="https://wa.me/1234567890" target="_blank">
             <FaWhatsapp />
            </SocialIcon>
            <SocialIcon href="https://www.facebook.com" target="_blank">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com" target="_blank">
              <FaInstagram />
            </SocialIcon>
          </SocialIcons>
        </RightColumn>
      </Wrapper>
    </Container>
  );
};

export default Contact;