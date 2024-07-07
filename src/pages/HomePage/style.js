import styled from "styled-components";
export const Container = styled.div`
  padding: 20px 30px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: #ffffff;
  position: relative;
  min-height: 100vh;
`;

export const Section = styled.div`
  max-width: 1400px;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: #ffffff; 
  border-radius: 10px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  border-radius: 10px;
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
  color: #343a40; 
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ViewMoreButton = styled.button`
  padding: 0.5rem 1rem;
  width: 110px;
  height: 40px;
  background-color: #EB0029;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #AB0029;
  }

  &:disabled {
    background-color: #EB0029;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 35px;
    font-size: 0.875rem;
  }
`;