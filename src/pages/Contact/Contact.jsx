import React, { useState } from "react";
import { Send } from "@mui/icons-material";
import Footer from "../../components/Footer/Footer";
import {
  Container, MapContainer, ContentContainer, Title, Description, Section,
  SectionDescription, FormContainer, SectionTitle, InfoItem, InfoText, Icon,
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
    console.log("Form submitted:", formData);
  };

  return (
    <Container>
      <MapContainer>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1118091707317!2d106.64413597451758!3d10.802747858708713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294f54eb01c5%3A0x396235bd5cb7f4ab!2zMTI3LzE0IEhvw6BuZyBIb2EgVGjDoW0sIFBoxrDhu51uZyAxMywgVMOibiBCw6xuaCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1721274549166!5m2!1svi!2s" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </MapContainer>
      <ContentContainer>
        <Title>
          Liên Hệ Chúng Tôi</Title>
        <Description>
          Chúng tôi rất muốn nghe ý kiến ​​từ bạn! Vui lòng điền vào mẫu dưới đây để liên lạc với chúng tôi.
        </Description>
        <Section>
          <SectionTitle>Về Chúng Tôi</SectionTitle>
          <SectionDescription>
            Chào mừng đến với Nhà Pizza của Napoli! Chúng tôi tận tâm phục vụ bạn những chiếc bánh pizza ngon và đích thực nhất trong thị trấn. Công thức bí mật của chúng tôi đã được truyền qua nhiều thế hệ, đảm bảo mỗi miếng ăn đều là một trải nghiệm thú vị. Cho dù bạn đang muốn thưởng thức món Margherita cổ điển hay pizza đặc sản dành cho người sành ăn, thì Napoli's Pizza House là nơi thích hợp.
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
              Gửi Tin Nhắn
            </StyledButton>
          </form>
        </FormContainer>
      </ContentContainer>
      <Footer />
    </Container>
  );
};

export default Contact;
