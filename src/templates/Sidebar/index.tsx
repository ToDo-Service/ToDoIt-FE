import styled from "styled-components";
import TodaySchedule from "@/molecules/TO-DO/TodaySchedule";
import NextSchedule from "@/molecules/TO-DO/NextSchedule";
import FollowAnaylytics from "@/molecules/ANAYLYTICS/FollowAnaylytics";
import MyAnaylytics from "@/molecules/ANAYLYTICS/MyAnaylytics";
import SidebarHeader from "@/organisms/SidebarHeader";
import { useSession } from "next-auth/react";

const S_Background = styled.nav`
  height: 100vh;
  width: 270px;
  background-color: #f7f8f9;
  border-radius: 6px;
  filter: drop-shadow(2px 4px rgba(12, 0, 24, 0.1));
  font-family: "Pretendard";
  position: fixed;

  & ul {
    list-style: none;
  }

  & ul li {
    width: 95%;
    height: 5vh;
    line-height: 5vh;
    border-radius: 6px;
  }
  & ul li:hover {
    background-color: #f1ebf9;
    transition: 0.5s ease-in-out;
  }

  & h3 {
    margin-left: 14%;
    margin-top: 20%;
    color: #b3b3bd;
    font-size: 20px;
    font-weight: 400;
  }
`;

const Sidebar = () => {
  return (
    <S_Background>
      <SidebarHeader />
      <h3>TO-DO</h3>
      <ul>
        <li>
          <TodaySchedule />
        </li>
        <li>
          <NextSchedule />
        </li>
      </ul>
      <h3>ANAYLYTICS</h3>
      <ul>
        <li>
          <MyAnaylytics />
        </li>
        <li>
          <FollowAnaylytics />
        </li>
      </ul>
      <h3>PROJECT</h3>
    </S_Background>
  );
};

export default Sidebar;
