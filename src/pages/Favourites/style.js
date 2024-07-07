import styled from "styled-components";
export const Container = styled.div`
  padding: 20px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg};
`;

export const Section = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const NoOrderAnimationContainer = styled.div`
  width: 350px; 
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;