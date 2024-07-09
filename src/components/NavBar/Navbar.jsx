import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../utils/Images/logo_auth.png";
import { FavoriteBorder, MenuRounded, SearchRounded, ShoppingCartOutlined } from "@mui/icons-material";
import Button from "../Button/Button";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/UserSlice";
import {
  Nav, NavContainer, NavItems, NavLogo,
  Navlink, MobileIcon, Logo, RestaurantName,
  TextButton, MobileIcons, MobileMenu, ButtonContainer,
} from "./style"


const Navbar = ({ setOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleAvatarClick = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const handleSearchClick = () => {
    navigate("/search");
    setIsOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>
        <NavLogo to="/">
          <Logo src={LogoImg} />
          <RestaurantName>Napoli's Pizza House</RestaurantName>
        </NavLogo>
        <MobileIcons>
          <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} onClick={handleSearchClick} />
          <Navlink to="/favorite">
            <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/cart">
            <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>

        </MobileIcons>
        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/dishes">Dishes</Navlink>
          <Navlink to="/orders">My Orders</Navlink>
          <Navlink to="/contact">About Us</Navlink>
        </NavItems>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <Navlink to="/" onClick={() => setIsOpen(false)}>Home</Navlink>
            <Navlink to="/dishes" onClick={() => setIsOpen(false)}>Dishes</Navlink>
            <Navlink to="/orders" onClick={() => setIsOpen(false)}>Orders</Navlink>
            <Navlink to="/contact" onClick={() => setIsOpen(false)}>Contact</Navlink>
            {currentUser ? (
              <>
                <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
              </>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <Button text="Sign Up" outlined small onClick={() => setOpenAuth(true)} />
                <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
              </div>
            )}
            {currentUser ? (
              <Navlink to="/profile" onClick={() => setIsOpen(false)}>{currentUser?.name}</Navlink>
            ) : (
              <Avatar style={{ cursor: "pointer" }} onClick={handleAvatarClick} src={currentUser?.img}></Avatar>
            )}
          </MobileMenu>
        )}
        <ButtonContainer>
          <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} onClick={handleSearchClick} />
          {currentUser ? (
            <>
              <Navlink to="/favorite">
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </Navlink>
              <Navlink to="/cart">
                <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
              </Navlink>
              <Avatar style={{ cursor: "pointer" }} onClick={handleAvatarClick} src={currentUser?.img}></Avatar>
              <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
            </>
          ) : (
            <>
              <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
            </>
          )}
        </ButtonContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
