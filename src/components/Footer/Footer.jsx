import React from "react";
import { FaFacebookF, FaYoutube, FaEnvelope } from "react-icons/fa";
import AppStoreBadge from "../../utils/Images/appstore.png";
import GooglePlayBadge from "../../utils/Images/googleplay.png";
import {
  FooterContainer, FooterBottom, FooterTop, Menu, MenuItem,
  MenuTitle, SocialIcon, SocialLinks, DownloadApps, AppBadge
} from "./style"

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <Menu>
          <MenuTitle>MENU</MenuTitle>
          <MenuItem>Burgers</MenuItem>
          <MenuItem>Pizzas</MenuItem>
          <MenuItem>Piriyanis</MenuItem>
          <MenuItem>Desserts</MenuItem>
          <MenuItem>Beverages</MenuItem>

        </Menu>
        <Menu>
          <MenuTitle>VỀ CHÚNG TÔI</MenuTitle>
          <MenuItem>Giới Thiệu</MenuItem>
          <MenuItem>Tầm Nhìn Của Chúng Tôi</MenuItem>
        </Menu>
        <Menu>
          <MenuTitle>THÔNG TIN TUYỂN DỤNG</MenuTitle>
          <MenuItem>Cơ Hội Nghề Nghiệp</MenuItem>
        </Menu>
        <Menu>
          <MenuTitle>LIÊN HỆ VỚI CHÚNG TÔI</MenuTitle>
          <SocialLinks>
            <SocialIcon href="#"><FaFacebookF /></SocialIcon>
            <SocialIcon href="#"><FaYoutube /></SocialIcon>
            <SocialIcon href="#"><FaEnvelope /></SocialIcon>
          </SocialLinks>
          <DownloadApps>
            <MenuTitle>TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI</MenuTitle>
            <AppBadge src={AppStoreBadge} alt="App Store" />
            <AppBadge src={GooglePlayBadge} alt="Google Play" />
          </DownloadApps>
        </Menu>
      </FooterTop>
      <FooterBottom>
        Công ty TNHH Pizza Việt Nam | Số ĐKKD: 0303902751 <br />
        127/14 Hoàng Hoa Thám, phường 13, Quận Tân Bình, TP.HCM, Việt Nam.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
