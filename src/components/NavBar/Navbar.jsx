import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { FavoriteBorder, MenuRounded, SearchRounded, ShoppingCartOutlined } from "@mui/icons-material";
import LogoImg from "../../utils/Images/logo_auth.png";
import { logout } from "../../redux/reducers/UserSlice";
import Button from "../Button/Button";
import {
  Nav, NavContainer, NavItems, NavLogo,
  Navlink, MobileIcon, Logo, RestaurantName,
  TextButton, MobileIcons, MobileMenu, ButtonContainer,
} from "./style";

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
        {/* Các biểu tượng trên menu di động */}
        <MobileIcons>
          <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} onClick={handleSearchClick} />
          <Navlink to="/favorite">
            <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/cart">
            <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
        </MobileIcons>
        {/* Các mục trên thanh điều hướng */}
        <NavItems>
          <Navlink to="/">Trang Chủ</Navlink>
          <Navlink to="/dishes">Món Ăn</Navlink>
          <Navlink to="/orders">Đơn Hàng</Navlink>
          <Navlink to="/contact">Giới thiệu</Navlink>
        </NavItems>
        {/* Menu di động */}
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <Navlink to="/" onClick={() => setIsOpen(false)}>Trang Chủ</Navlink>
            <Navlink to="/dishes" onClick={() => setIsOpen(false)}>Món Ăn</Navlink>
            <Navlink to="/orders" onClick={() => setIsOpen(false)}>Đơn Hàng</Navlink>
            <Navlink to="/contact" onClick={() => setIsOpen(false)}>Giới thiệu</Navlink>
            {currentUser && (
              <Navlink to="/profile" onClick={() => setIsOpen(false)}>Cá Nhân</Navlink>
            )}
            {currentUser ? (
              <TextButton onClick={() => dispatch(logout())}>Đăng Xuất</TextButton>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <Button text="Đăng Ký" outlined small onClick={() => setOpenAuth(true)} />
                <Button text="Đăng Nhập" small onClick={() => setOpenAuth(true)} />
              </div>
            )}
          </MobileMenu>
        )}
        {/* Container chứa các nút và biểu tượng trên thanh điều hướng */}
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
              <TextButton onClick={() => dispatch(logout())}>Đăng Xuất</TextButton>
            </>
          ) : (
            <Button text="Đăng Nhập" small onClick={() => setOpenAuth(true)} />
          )}
        </ButtonContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
