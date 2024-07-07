import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
export const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
export const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 10px;
`;