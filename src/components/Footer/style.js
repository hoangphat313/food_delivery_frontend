import styled from "styled-components";
export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  margin-top:10px;
`;

export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  gap: 20px;
  border-bottom: 1px solid #333;
  padding-bottom: 20px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MenuItem = styled.div`
  font-size: 14px;
  margin: 0 10px;
`;

export const MenuTitle = styled.h3`
  margin-bottom: 10px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
`;

export const SocialIcon = styled.a`
  color: #fff;
  font-size: 24px;
  transition: color 0.3s;
  &:hover {
    color: #ffcc00;
  }
`;

export const DownloadApps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AppBadge = styled.img`
  width: 120px;
  cursor: pointer;
`;

export const FooterBottom = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  line-height: 1.5;
`;
