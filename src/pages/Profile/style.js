import styled from "styled-components";
export const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const ProfileCard = styled.div`
  max-width: 600px;
  padding: 20px;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const DefaultAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const ProfileInfo = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

export const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProfileLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
  min-width: 100px;
  display: inline-block;
`;

export const ProfileValue = styled.span`
  flex: 1;
`;
