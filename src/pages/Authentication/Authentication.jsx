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
                Don't have an account ?{" "}
                <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
              </Text>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <Text>
                Already have an account ?{" "}
                <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
              </Text>
            </>
          )}
        </Right>
      </Container>
    </Modal>
  );
};

export default Authentication;
