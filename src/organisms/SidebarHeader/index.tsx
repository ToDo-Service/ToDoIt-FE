import styled from "styled-components";
import { useSession } from "next-auth/react";
import { UserIcon } from "@/atoms/UserIcon";

const SidebarHeaderContainer = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  border-bottom: solid 0.02px #c8c5cb;
  align-items: center;
  filter: drop-shadow(1px 2px 4 #c5c5c5);
`;

const UserNickName = styled.div`
  font-family: "Pretendard";
  margin-left: 10%;
  color: black;
  font-size: 15px;
  font-weight: 400;
`;

const SidebarHeader = () => {
  const { data: session } = useSession();

  return (
    <SidebarHeaderContainer>
      <UserIcon Img={session?.user?.image} />
      <UserNickName>{session?.user?.name}</UserNickName>
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
