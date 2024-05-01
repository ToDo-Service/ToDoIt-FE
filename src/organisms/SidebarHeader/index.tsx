import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
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
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 20px;
  font-weight: 400;
`;

const LogOut = styled.div`
  display: none;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: 10px;
  margin-left: 20px;

  ${media.phone`
  display:block;
  
  `}
`;
const UserEmail = styled.p`
  font-family: "PretendardVariable";
  margin-bottom: 0;
  font-weight: 300;
  margin-left: 20px;
  color: rgba(37, 37, 48, 0.4);
  font-size: 12px;
  font-weight: 400;
`;

type Props = {
  children?: React.ReactNode;
};

const SidebarHeader = ({ children }: Props) => {
  const { data: session } = useSession();

  return (
    <SidebarHeaderContainer>
      <UserIcon Img={session?.user?.image} email={session?.user?.email} />
      <div>
        <UserNickName>{session?.user?.name}</UserNickName>
        <UserEmail>{session?.user?.email}</UserEmail>
      </div>
      <LogOut onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
        로그아웃
      </LogOut>
      {children}
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
