import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { UserSignIn } from "../../api";
import { loginSuccess } from "../../redux/reducers/UserSlice";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { Container, Title, Span, FieldContainer, ErrorMessage, TextButton } from "./style"


const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInputs = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Please enter your email");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password");
      isValid = false;
    }

    return isValid;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await UserSignIn({ email, password });
        if (res.data.token && res.data.user) {
          localStorage.setItem("food-app-token", res.data.token);
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "success",
            })
          );
          setOpenAuth(false);
        } else {
          setPasswordError(res.data.message || "Incorrect password");
        }
      } catch (err) {
        setPasswordError(err.response?.data?.message || "Login failed. Please try again.");
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Napoli's Pizza House 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <FieldContainer>
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            handelChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </FieldContainer>
        <FieldContainer>
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            handelChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </FieldContainer>
        <TextButton>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;
