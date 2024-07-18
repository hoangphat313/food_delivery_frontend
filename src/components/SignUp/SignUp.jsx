import React, { useState } from "react";
import { Title, Span, ErrorMessage, Container } from "./style"
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { UserSignUp } from "../../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducers/UserSlice";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";



const SignUp = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Regex to validate password containing at least one uppercase, one lowercase, one digit, and minimum 6 characters
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(password);
  };

  const validateInputs = () => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name) {
      setNameError("Xin hãy nhập tên của bạn");
      isValid = false;
    }

    if (!email) {
      setEmailError("Vui lòng nhập email");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu của bạn");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một chữ số và tối thiểu 6 ký tự");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Sign Up Successful",
              severity: "success",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((err) => {
          setButtonDisabled(false);
          if (err.response) {
            setLoading(false);
            setButtonDisabled(false);
            alert(err.response.data.message);
            dispatch(
              openSnackbar({
                message: err.response.data.message,
                severity: "error",
              })
            );
          } else {
            setLoading(false);
            setButtonDisabled(false);
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error",
              })
            );
          }
        });
    } else {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Tạo Tài Khoản Mới 👋</Title>
        <Span>Vui lòng nhập thông tin chi tiết để tạo tài khoản mới</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Tên Đầy Đủ"
          placeholder="Nhập tên đầy đủ của bạn..."
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        <TextInput
          label="Địa Chỉ Email"
          placeholder="Nhập địa chỉ email của bạn..."
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <TextInput
          label="Mật Khẩu"
          placeholder="Nhập mật khẩu của bạn..."
          password
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <Button
          text="Đăng Ký"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
