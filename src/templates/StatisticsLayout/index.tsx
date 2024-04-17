import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { SidebarLayout, jwtToken } from "@/reocoil";
import { FC, useState } from "react";
import { media } from "@/styles/media";
import StatisticsHeaderText from "@/atoms/Statistics/StatisticsHeaderText";
import StatisticsComplete from "@/molecules/Statistics/StatisticsComplete";
import StatisticsPlan from "@/molecules/Statistics/StatisticsPlan";
import StatisticsProject from "@/molecules/Statistics/StatisticsProject";
import StatisticsMost from "@/molecules/Statistics/StatisticsMostbusy";
import useSWR from "swr";
import Fetcher from "@/utils/fetcher";

const FindMostProject = (ProjectList: any) => {
  let m = new Map();
  ProjectList.map((item: any) => {
    m.set(item.title, (m.get(item.title) || 0) + 1);
  });
  const sortedMap = [...m].sort((a, b) => b[1] - a[1]);
  m = new Map(sortedMap);
  return sortedMap[0][0];
};

const StatisticsMainLayout = styled.div<{ open: boolean | null }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  padding-left: 336px;
  padding-top: 161px;
  animation: 0.7s
    ${(prop) => (prop.open !== null && prop.open ? "PopUpTodo" : "PopOutTodo")}
    forwards;
  z-index: 2;

  & > div:not(:last-child) {
    margin-right: 22px;
  }

  @keyframes PopUpTodo {
    0% {
      transform: translate(-10%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOutTodo {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-10%, 0);
    }
  }

  ${media.phone`      
  transition: 0.7s ease-in-out;
      opacity: ${(props: { open: null }) =>
        props.open !== null && props.open ? "0" : "1"}      
  `}

  & h5 {
    font-size: 15px;
  }
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.0007fr 1fr 1.86fr;
  box-sizing: border-box; //부모요소 값 고정
  column-gap: 32px;
  margin-top: 40px;

  & div:nth-child(4) {
    grid-column: 2/3;
    grid-row: 2/4;
  }
`;

const PlanFlexbox = styled.div`
  display: flex;
  width: 100%;
  & div:first-child {
    margin-right: 22px;
  }
`;

const ProjectText = styled.div`
  display: flex;

  & span {
    font-size: 12px;
  }
`;

const StatisticsLayout: FC = () => {
  const SToogleState = useRecoilValue(SidebarLayout);
  const [month, setMonth] = useState<number>(4);
  const jwt = useRecoilValue(jwtToken);
  let [mostProjectCount, setMostProjectCount] = useState<number>(0);

  const { data } = useSWR(
    `https://laoh.site/api/todos/month?year=2024&month=${month}`,
    (uri) => Fetcher(uri, jwt)
  );
  console.log(data?.body);
  const ProejctList = data?.body
    .map((item: any) => {
      return item.project !== null && item.project;
    })
    .filter((e: any) => e !== false && e);

  const MostProejct = FindMostProject(ProejctList);

  return (
    <StatisticsMainLayout open={SToogleState.sidebartoggle}>
      <StatisticsHeaderText userName="안승찬" month={month} />
      <div>
        <StatisticsGrid>
          <h5>일정완료</h5>
          <h5>가장 바빴던날</h5>
          <PlanFlexbox>
            <StatisticsPlan planCount={data.body.length} />
            <StatisticsComplete planCount={1} />
          </PlanFlexbox>
          <StatisticsMost date="4월 12일 " />
          <div>
            <ProjectText>
              <h5>프로젝트</h5>
              <span>
                안승찬님은 이번 달 {ProejctList.length}개의 프로젝트를 진행했고
                {MostProejct}이 계획된 일정 ${}개로 가장 많았습니다.
              </span>
            </ProjectText>
            <StatisticsProject project={ProejctList} />
          </div>
        </StatisticsGrid>
      </div>
    </StatisticsMainLayout>
  );
};

export default StatisticsLayout;
