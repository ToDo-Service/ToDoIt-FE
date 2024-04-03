import Image from "next/image";

import styled from "styled-components";

const U_Icon = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;
const UserEmail = styled.div`
  display: none;
  filter: none;
  border: 0.5px solid rgba(12, 0, 24, 0.1);
  position: absolute;
  border-radius: 8px;
  top: 80px;
  left: 20px;
  height: max-content;
  width: max-content;
  padding: 5px;
  font-size: 12px;
  background-color: #f8f4fd;
  transition: 0.5s ease-in-out;
`;

const UserInformation = styled.div`
  margin-left: 10%;
  &:hover .email {
    display: block;
  }
  &:active .email {
    display: block;
  }
`;

export const UserIcon = ({ Img, email }: any) => {
  return (
    <UserInformation>
      <U_Icon src={`${Img}`} alt="유저 아이콘" />
      <UserEmail className="email">{email}</UserEmail>
    </UserInformation>
  );
};
