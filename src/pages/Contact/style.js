import { Button, TextField } from "@mui/material";
import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
`;

export const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  text-align: center;
  max-width: 600px;
`;

export const Section = styled.div`
  max-width: 800px;
  margin-bottom: 40px;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
`;

export const SectionDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text_primary};
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const Icon = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.primary};
`;

export const InfoText = styled.div`
  font-size: 1.1rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

export const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;