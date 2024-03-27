import styled from "styled-components";
import TodaySchedule from "@/molecules/TO-DO/TodaySchedule";
import NextSchedule from "@/molecules/TO-DO/NextSchedule";
import FollowAnaylytics from "@/molecules/ANAYLYTICS/FollowAnaylytics";
import MyAnaylytics from "@/molecules/ANAYLYTICS/MyAnaylytics";
import SidebarHeader from "@/organisms/SidebarHeader";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SidebarLayout, jwtToken } from "@/reocoil";
import { LoadingSpinner } from "@/atoms/LoadingSpinner";
import BurgerIcon from "@/atoms/BurgerIcon";

const S_Background = styled.div<{ Open: boolean | null }>`
  z-index: 99;
  height: 100vh;
  width: 264px;
  display: flex;
  animation: 0.7s
    ${(props) => (props.Open !== null && props.Open ? "PopUp" : "PopOut")}
    forwards;

  @keyframes PopUp {
    0% {
      transform: translate(-70%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOut {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-70%, 0);
      display: none;
    }
  }
`;

const S_Content = styled.nav<{ Open: boolean | null }>`
  height: 100%;
  width: 80%;
  background-color: #f7f8f9;
  border-radius: 6px;
  filter: drop-shadow(2px 4px rgba(12, 0, 24, 0.1));
  font-family: "Pretendard";

  z-index: 99;
  min-width: 230px;
  animation: 0.7s
    ${(props) => (props.Open !== null && props.Open ? "PopUp" : "PopOut")}
    forwards;

  & ul {
    list-style: none;
  }

  & ul li {
    width: 95%;
    height: 5vh;
    line-height: 5vh;
    border-radius: 6px;
    cursor: pointer;
  }
  & ul li:hover {
    background-color: #f1ebf9;
    transition: 0.5s ease-in-out;
  }

  & ul li.active {
    background-color: #f1ebf9;
  }

  & h3 {
    margin-left: 14%;
    margin-top: 20%;
    color: #b3b3bd;
    font-size: 18px;
    width: fit-content;
    border-radius: 6px;
    font-weight: 400;
  }
  & h3:last-child:hover {
    color: #dfc9fb;
    transition: 0.5s ease-in-out;
  }
  & h3.active {
    color: #dfc9fb;
    transition: 0.5s ease-in-out;
  }

  @keyframes PopUp {
    0% {
      transform: translate(-70%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOut {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-70%, 0);
    }
  }
`;

const ProjectListli = styled("li")<{ color: string }>`
  display: flex;
  align-items: center;
  height: 10%;
  max-width: max-content;
  padding: 4px;

  & a {
    text-decoration: none;
    color: ${(props) => (props.color ? `${props.color}` : "black")};
  }

  &:hover {
    max-width: max-content;
  }
`;

const ProjectListUl = styled.ul`
  overflow-y: scroll;
  height: 350px;
  position: relative;
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarPopUpBtn = styled.button<{ show: boolean | null }>`
  display: ${(props) => (props.show ? "none" : "block")};
  z-index: 99;
`;

interface ProejectT {
  id: number;
  category: string;
  color: string;
  description: string;
  end_date: string;
  title: string;
}

const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState(
    router.asPath === "/main/today" ? "today" : ""
  );
  const SToggle = useSetRecoilState(SidebarLayout);
  const SToogleStaet = useRecoilValue(SidebarLayout);
  const [sideMenu, setSideMenu] = useState<boolean | null>(null);
  const jwt = useRecoilValue(jwtToken);

  const { data, error, isLoading } = useSWR(
    jwt.token !== "" && "https://laoh.site/api/project",
    (url) => fetcher(url, jwt)
  );

  const showSidebar = () => {
    setSideMenu(true);
    SToggle(true);
  };
  const hideSidebar = () => {
    setSideMenu(false);
    SToggle(false);
  };

  return (
    <S_Background Open={sideMenu}>
      <S_Content Open={sideMenu}>
        <SidebarHeader />
        <h3
          className={
            active === "today" || active === "nextplan" ? "active" : ""
          }
          onClick={() => setActive("project")}
        >
          TO-DO
        </h3>
        <ul>
          <Link
            href={{ pathname: `/main/today` }}
            style={{ textDecoration: "none", color: "black" }}
            passHref
          >
            <li
              className={active === "today" ? "active" : ""}
              onClick={() => setActive("today")}
            >
              <TodaySchedule />
            </li>
          </Link>
          <Link
            href={{ pathname: `/main/nextplan` }}
            style={{ textDecoration: "none", color: "black" }}
            passHref
          >
            <li
              className={active === "nextplan" ? "active" : ""}
              onClick={() => setActive("nextplan")}
            >
              <NextSchedule />
            </li>
          </Link>
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
        <Link
          href={{ pathname: `/main/project` }}
          style={{ textDecoration: "none", color: "black" }}
          passHref
        >
          <h3
            className={active === "project" ? "active" : ""}
            onClick={() => setActive("project")}
          >
            PROJECT
          </h3>
        </Link>
        <ProjectListUl>
          {!data ? (
            <LoadingSpinner />
          ) : (
            data.body.map((item: ProejectT) => {
              return (
                <ProjectListli
                  key={item.id}
                  color={item.color}
                  className={
                    router.asPath === `/main/project/${item.id}` ? "active" : ""
                  }
                >
                  <Link href={`/main/project/${item.id}`}>{item.title}</Link>
                </ProjectListli>
              );
            })
          )}
        </ProjectListUl>
      </S_Content>

      <BurgerIcon
        size="40px"
        show={sideMenu}
        onclick={sideMenu ? hideSidebar : showSidebar}
      />
    </S_Background>
  );
};

export default Sidebar;
