import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { Container, Label, OutlinedInput, Chip, ChipWrapper, Input, Error } from "./style"

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handleChange,
  textArea,
  rows,
  columns,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    if (handleChange) {
      handleChange(e);
    }
  };
  return (
    <Container small={small}>
      <Label small={small} popup={popup} error={error}>
        {label}
      </Label>
      <OutlinedInput
        small={small}
        popup={popup}
        error={error}
        chipableInput={chipableInput}
        height={height}
      >
        {chipableInput ? (
          <ChipWrapper>
            {chipableArray.map((chip, index) => (
              <Chip key={index}>
                <span>{chip}</span>
                <CloseRounded
                  sx={{ fontSize: "14px" }}
                  onClick={() => removeChip(name, index)}
                />
              </Chip>
            ))}
            <Input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={handleInputChange}
            />
          </ChipWrapper>
        ) : (
          <>
            <Input
              popup={popup}
              small={small}
              as={textArea ? "textarea" : "input"}
              name={name}
              rows={rows}
              columns={columns}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              type={password && !showPassword ? "password" : "text"}
            />
            {password && (
              <>
                {showPassword ? (
                  <>
                    <Visibility onClick={() => setShowPassword(false)} />
                  </>
                ) : (
                  <>
                    <VisibilityOff onClick={() => setShowPassword(true)} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </OutlinedInput>
      {error && (
        <Error small={small} popup={popup}>
          {error}
        </Error>
      )}
    </Container>
  );
};

export default TextInput;
