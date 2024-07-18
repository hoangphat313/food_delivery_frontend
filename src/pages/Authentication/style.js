import styled from "styled-components";
export const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
`;

export const Left = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  width: 100px; 
  height: auto; 
`;

export const Image = styled.img`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Right = styled.div`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 2px;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
`;

export const Text = styled.p`
  display: flex;
  gap: 12px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
`;

export const TextButton = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;