import styled from "styled-components";
export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.primary};
  padding: 0px 4px;
  ${({ error, theme }) =>
        error &&
        `
    color: ${theme.red};
  `}
  ${({ small }) =>
        small &&
        `
    font-size: 8px;
  `}
  ${({ popup, theme }) =>
        popup &&
        `
  color: ${theme.popup_text_secondary};
  `}
`;

export const OutlinedInput = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.secondary};
  }
  ${({ error, theme }) =>
        error &&
        `
    border-color: ${theme.red};
  `}

  ${({ chipableInput, height, theme }) =>
        chipableInput &&
        `
    background: ${theme.card};
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    min-height: ${height}
  `}

  ${({ small }) =>
        small &&
        `
    border-radius: 6px;
    padding: 8px 10px;
  `}

  ${({ popup, theme }) =>
        popup &&
        `
  color: ${theme.popup_text_secondary};
  border: 0.5px solid ${theme.popup_text_secondary + 60};
  `}
`;

export const Input = styled.input`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  &:focus {
    outline: none;
  }
  ${({ small }) =>
        small &&
        `
    font-size: 12px;
  `}

  ${({ popup, theme }) =>
        popup &&
        `
  color: ${theme.popup_text_secondary};
  `} ${({ theme }) => theme.popup_text_secondary};
`;

export const Error = styled.p`
  font-size: 12px;
  margin: 0px 4px;
  color: ${({ theme }) => theme.red};
  ${({ small }) =>
        small &&
        `
    font-size: 8px;
  `}
`;

export const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Chip = styled.div`
  padding: 5px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 10};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
`;