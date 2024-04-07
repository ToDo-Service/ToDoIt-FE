import styled from "styled-components";
import { useSession } from "next-auth/react";
import { UserIcon } from "@/atoms/UserIcon";
import React from "react";
import { media } from "@/styles/media";

const SidebarHeaderContainer = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  border-bottom: solid 0.02px #c8c5cb;
  align-items: center;
  filter: drop-shadow(1px 2px 4 #c5c5c5);
  position: relative;
  ${media.phone`
     height:80px
  `}
`;

const UserNickName = styled.div`
  font-family: "Pretendard-Bold";
  font-weight: 300;
  margin-left: 10%;
  color: black;
  font-size: 15px;
  font-weight: 400;
`;

const LogOut = styled.div`
  display: none;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: 10px;
  margin-left: 40px;

  ${media.phone`
  display:block;
  
  `}
`;

type Props = {
  children?: React.ReactNode;
};

const SidebarHeader = ({ children }: Props) => {
  const { data: session } = useSession();

  return (
    <SidebarHeaderContainer>
      <UserIcon Img={session?.user?.image} email={session?.user?.email} />
      <UserNickName>{session?.user?.name}</UserNickName>
      <LogOut>로그아웃</LogOut>
      {children}
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
