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
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import { GetServerSideProps } from "next";
import { LoadingSpinner } from "@/atoms/LoadingSpinner";

const S_Background = styled.nav`
  height: 100vh;
  width: 230px;
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
`;

const ProjectListli = styled("li")<{ color: string }>`
  display: flex;
  align-items: center;
  height: 10%;
  max-width: 50%;
  padding: 4px;

  & a {
    text-decoration: none;
    color: ${(props) => (props.color ? `${props.color}` : "black")};
  }
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

  const jwt = useRecoilValue(jwtToken);

  const { data, error, isLoading } = useSWR(
    "https://laoh.site/api/project",
    (url) => fetcher(url, jwt)
  );

  return (
    <S_Background>
      <SidebarHeader />
      <h3>TO-DO</h3>
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
      <ul>
        {!data ? (
          <LoadingSpinner />
        ) : (
          data.body.map((item: ProejectT) => {
            return (
              <ProjectListli key={item.id} color={item.color}>
                <Link
                  href={`/main/project/${item.id}`}
                  className={
                    router.asPath === `/main/project/${item.id}` ? "active" : ""
                  }
                >
                  {item.title}
                </Link>
              </ProjectListli>
            );
          })
        )}
      </ul>
    </S_Background>
  );
};

export default Sidebar;
