import React, { useState } from "react";
import { Send } from "@mui/icons-material";
import Footer from "../../components/Footer/Footer";
import {
  Container, Title, Description, Section,
  SectionDescription, FormContainer,
  SectionTitle, InfoItem, InfoText, Icon,
  ContactInfo, StyledButton, StyledTextField
} from "./style"


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log("Form submitted:", formData);
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      <Description>
        We'd love to hear from you! Please fill out the form below to get in touch with us.
      </Description>
      <Section>
        <SectionTitle>About Us</SectionTitle>
        <SectionDescription>
          Welcome to Napoli's Pizza House! We are dedicated to serving you the most authentic and delicious pizza in town. Our secret recipe has been passed down through generations, ensuring every bite is a delightful experience. Whether you're in the mood for a classic Margherita or a gourmet specialty pizza, Napoli's Pizza House is the place to be.
        </SectionDescription>
      </Section>
      <ContactInfo>
        <InfoItem>
          <Icon><Send /></Icon>
          <InfoText>phoangphat313@gmail.com</InfoText>
        </InfoItem>
        <InfoItem>
          <Icon><Send /></Icon>
          <InfoText>039 570 4727</InfoText>
        </InfoItem>
        <InfoItem>
          <Icon><Send /></Icon>
          <InfoText>127/14 Hoàng Hoa Thám, phường 13, Quận Tân Bình, TP.HCM, Việt Nam.</InfoText>
        </InfoItem>
      </ContactInfo>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <StyledTextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <StyledButton
            variant="contained"
            type="submit"
            startIcon={<Send />}
          >
            Send Message
          </StyledButton>
        </form>
      </FormContainer>
      <Footer />
    </Container>
  );
};

export default Contact;
