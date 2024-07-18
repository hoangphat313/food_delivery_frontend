import { Modal } from "@mui/material";
import React, { useState } from "react";
import LogoImage from "../../utils/Images/logo_auth.png";
import AuthImage from "../../utils/Images/AuthImage.jpg";
import { Close } from "@mui/icons-material";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { Container, Left, Logo, Image, Right, CloseButton, Text, TextButton } from "./style"


const Authentication = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <Container>
        <Left>
          <Logo src={LogoImage} />
          <Image src={AuthImage} />
        </Left>
        <Right>
          <CloseButton>
            <Close onClick={() => setOpenAuth(false)} />
          </CloseButton>
          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <Text>
                {" "}
                Không Có Tài Khoản ?{" "}
                <TextButton onClick={() => setLogin(false)}>Đăng Ký</TextButton>
              </Text>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <Text>
                Đã Có Tài Khoản ?{" "}
                <TextButton onClick={() => setLogin(true)}>Đăng Nhập</TextButton>
              </Text>
            </>
          )}
        </Right>
      </Container>
    </Modal>
  );
};

export default Authentication;
