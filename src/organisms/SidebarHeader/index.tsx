import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { UserIcon } from "@/atoms/UserIcon";

const SidebarHeaderContainer = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  border-bottom: solid 0.02px #c8c5cb;
  align-items: center;
`;

// const UserIcon = styled.div`
//   border-radius: 50px;
//   background-color: lightpink;
//   width: 40px;
//   height: 40px;
//   margin-left: 10%;
// `;

const UserNickName = styled.div`
  font-family: "Pretendard";
  margin-left: 10%;
  color: black;
  font-size: 20px;
  font-weight: 400;
`;

const Alarm = styled.div`
  margin-left: 74px;
`;

const SidebarHeader = () => {
  const { data: session, status } = useSession();
  const [userImage, setUserImage] = useState("");

  // useEffect(() => {
  //   setUserImage(session?.user.image);
  // }, [userImage]);

  console.log(typeof userImage);

  return (
    <SidebarHeaderContainer>
      <UserIcon Img={userImage} />
      {/* <UserNickName>{session?.user.name}</UserNickName> */}
      <Alarm>
        <Icon.Bell size={"20px"} />
      </Alarm>
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
