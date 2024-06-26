import styled from "styled-components";
import TodaySchedule from "@/molecules/TO-DO/TodaySchedule";
import NextSchedule from "@/molecules/TO-DO/NextSchedule";
import FollowAnaylytics from "@/molecules/ANAYLYTICS/FollowAnaylytics";
import MyAnaylytics from "@/molecules/ANAYLYTICS/MyAnaylytics";
import SidebarHeader from "@/organisms/SidebarHeader";
import { useRouter } from "next/router";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SidebarLayout, jwtToken } from "@/reocoil";
import BurgerIcon from "@/atoms/BurgerIcon";
import type { ProejectProps } from "@/types/tb";
import { media } from "@/styles/media";

const S_Background = styled.div<{ open: boolean | null }>`
  height: ${(props) => (props.open !== null && props.open ? "100vh" : "10vh")};
  width: 270px;
  display: flex;
  border-radius: 6px;

  animation: 0.7s
    ${(props) => (props.open !== null && props.open ? "PopUp" : "PopOut")}
    forwards;

  ${media.phone`
  width: 270px;

  `}
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

const TodoContent = styled.ul`
  list-style: none;
  margin-top: 84px;
  padding: 0;
  padding-left: 9%;
`;

const AnalyticsContent = styled.ul`
  list-style: none;
  margin-top: 10px;
  padding: 0;
  padding-left: 9%;
`;

const S_Content = styled.nav<{ open: boolean | null }>`
  height: 100%;
  width: 100%;
  background-color: #f7f8f9;
  border-radius: 6px;
  font-family: "PretendardVariable";
  font-weight: 350;
  min-width: 220px;
  animation: 0.7s
    ${(props) => (props.open !== null && props.open ? "PopUp" : "PopOut")}
    forwards;
  /* & ul {
    margin: 0;
    padding: 0;
  } */
  & ul li {
    margin-top: 5px;
    display: flex;
    align-items: center;
    width: 90%;
    /* height: 3.0039vh; */
    padding-left: 10px;
    height: 41px;
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
    margin-top: 45px;
    margin-bottom: 0;
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
  height: 41px;
  max-height: 41px;

  & a {
    text-decoration: none;
    color: ${(props) => (props.color ? `${props.color}` : "black")};
  }
`;

const ProjectListUl = styled.ul`
  overflow-y: scroll;
  height: max-content;
  position: relative;
  margin-top: 10px;
  padding: 0;
  padding-left: 9%;
  overflow: scroll;

  /* & li:first-child {
    margin-top: 5px;
  } */

  & li:not(:first-child) {
    margin-top: 0;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarOpenIcon = styled.span<{ open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-top: 10px;
  width: 35px;
  height: 35px;
  border-radius: 6px;
  animation: 0.7s
    ${(props) => (props.open !== null && props.open ? "PopUp" : "PopOut")}
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
    }
  }

  &:hover {
    background-color: #d2d2d2;
    transition: 0.1s ease-in-out;
  }
`;

const Sidebar: FC = () => {
  const router = useRouter();
  const [active, setActive] = useState("/main/today");
  const SToggle = useSetRecoilState(SidebarLayout);
  const SidePop = useRecoilValue(SidebarLayout);
  const jwt = useRecoilValue(jwtToken);
  const [sidePop, setSidePop] = useState(false);

  useEffect(() => {
    setSidePop(SidePop.sidebartoggle);
  }, [SidePop]);

  useEffect(() => {
    setActive(router.asPath);
  }, [router.asPath]);

  const { data } = useSWR(
    jwt.token !== "" && "https://laoh.site/api/project",
    (url) => fetcher(url, jwt)
  );

  const showSidebar = () => {
    SToggle({ sidebartoggle: true, HeaderAnimaion: null });
  };
  const hideSidebar = () => {
    SToggle({ sidebartoggle: false, HeaderAnimaion: null });
  };

  return (
    <>
      <S_Background open={sidePop}>
        <S_Content open={sidePop}>
          <SidebarHeader />
          <TodoContent>
            <Link
              href={{ pathname: `/main/today` }}
              style={{ textDecoration: "none", color: "black" }}
              passHref // a태그로 href 보냄, 검색엔진 최적화
            >
              <li className={active === "/main/today" ? "active" : ""}>
                <TodaySchedule />
              </li>
            </Link>
            <Link
              href={{ pathname: `/main/nextplan` }}
              style={{ textDecoration: "none", color: "black" }}
              passHref
            >
              <li className={active === "/main/nextplan" ? "active" : ""}>
                <NextSchedule />
              </li>
            </Link>
          </TodoContent>

          <h3
            className={
              active === "/main/statistics" || active === "nextplan"
                ? "active"
                : ""
            }
          >
            ANAYLYTICS
          </h3>
          <AnalyticsContent>
            <Link
              href={{ pathname: `/main/statistics` }}
              style={{ textDecoration: "none", color: "black" }}
              passHref // a태그로 href 보냄, 검색엔진 최적화
            >
              <li className={active === "/main/statistics" ? "active" : ""}>
                <MyAnaylytics />
              </li>
            </Link>

            <li>
              <FollowAnaylytics />
            </li>
          </AnalyticsContent>
          <Link
            href={{ pathname: `/main/project` }}
            style={{ textDecoration: "none", color: "black" }}
            passHref
          >
            <h3 className={active === "/main/project" ? "active" : ""}>
              PROJECT
            </h3>
          </Link>
          <ProjectListUl>
            {data?.body.map((item: ProejectProps) => {
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
            })}
          </ProjectListUl>
        </S_Content>
        <SidebarOpenIcon open={sidePop}>
          <BurgerIcon
            size="25px"
            show={SidePop.sidebartoggle}
            onclick={SidePop.sidebartoggle ? hideSidebar : showSidebar}
          />
        </SidebarOpenIcon>
      </S_Background>
    </>
  );
};

export default Sidebar;
