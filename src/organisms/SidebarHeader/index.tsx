import styled from "styled-components";
import { useSession } from "next-auth/react";
import { UserIcon } from "@/atoms/UserIcon";
import React from "react";

const SidebarHeaderContainer = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  border-bottom: solid 0.02px #c8c5cb;
  align-items: center;
  filter: drop-shadow(1px 2px 4 #c5c5c5);
  position: relative;
`;

const UserNickName = styled.div`
  font-family: "Pretendard-Bold";
  font-weight: 300;
  margin-left: 10%;
  color: black;
  font-size: 15px;
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
      <UserNickName>{session?.user?.name}</UserNickName>
      {children}
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
