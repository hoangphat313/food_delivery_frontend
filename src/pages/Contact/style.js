import styled from "styled-components";
import { TextField, Button } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #f9f9f9;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const MapContainer = styled.div`
  flex: 1;
  min-width: 300px;
  margin-right: 20px;
  @media (max-width: 768px) {
    order: 2;
    margin-right: 0;
    margin-top: 20px;
  }
  iframe {
    border: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ContentContainer = styled.div`
  flex: 2;
  min-width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    order: 1;
    padding: 15px;
  }
  
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

export const Description = styled.p`
  margin-bottom: 20px;
  color: #666;
  text-align: center;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const SectionDescription = styled.p`
  margin-bottom: 20px;
  color: #666;
`;

export const ContactInfo = styled.div`
  margin-bottom: 20px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const InfoText = styled.span`
  margin-left: 10px;
  color: #555;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  color: #0073e6;
`;

export const FormContainer = styled.div`
  margin-top: 20px;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 20px !important;
  .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 20px;
  background-color: #0073e6 !important;
  color: white !important;
  &:hover {
    background-color: #005bb5 !important;
  }
`;
