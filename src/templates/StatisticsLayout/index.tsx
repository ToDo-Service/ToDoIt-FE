import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { SidebarLayout, jwtToken } from "@/reocoil";
import { FC, useState } from "react";
import StatisticsHeaderText from "@/atoms/Statistics/StatisticsHeaderText";
import StatisticsComplete from "@/molecules/Statistics/StatisticsComplete";
import StatisticsPlan from "@/molecules/Statistics/StatisticsPlan";
import StatisticsProject from "@/molecules/Statistics/StatisticsProject";
import StatisticsMost from "@/molecules/Statistics/StatisticsMostbusy";
import useSWR from "swr";
import Fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { media } from "@/styles/media";

const FindMostProject = (ProjectList: any) => {
  let m = new Map();
  ProjectList?.map((item: any) => {
    m.set(item.title, (m.get(item.title) || 0) + 1);
  });
  const sortedMap = [...m].sort((a, b) => b[1] - a[1]);
  m = new Map(sortedMap);
  const mostCount = sortedMap[0][0];

  return [sortedMap, mostCount];
};
const FindMostDate = (TodoList: any) => {
  let m = new Map();
  TodoList?.map((item: any) => {
    m.set(item.end_date, (m.get(item.end_date) || 0) + 1);
  });
  const sortedMap = [...m].sort((a, b) => b[1] - a[1]);
  m = new Map(sortedMap);
  const mostCount = sortedMap[0][0];

  return [sortedMap, mostCount];
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
        props.open !== null && props.open ? "0" : "1"}   ;  
        padding-left: 0;
        width:125%;
        padding-top: 80px;   
        overflow-y: scroll;
        
  `}

  & h5 {
    font-size: 15px;
    font-family: "PretendardVariable";
    font-weight: 400;
    ${media.phone`
          display:none;
      `}
  }
`;

const StatisticsGrid = styled.div`
  max-width: 1104px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.0007fr 1fr 1.86fr;
  box-sizing: border-box; //부모요소 값 고정
  column-gap: 32px;
  margin-top: 40px;

  & div:nth-child(4) {
    grid-column: 2/3;
    grid-row: 2/4;

    ${media.phone`
    grid-column: auto;
    grid-row: auto;

    `}
  }

  ${media.phone`
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  place-items: center;
  
  `}
`;

const PlanFlexbox = styled.div`
  display: flex;
  width: 100%;

  & div:first-child {
    margin-right: 22px;
    ${media.phone`
     margin-right:0;     
     margin-bottom : 10px;
  `}
  }
  ${media.phone`
     flex-direction: column;     
     align-items: center;
     justify-content: center;
     order:1;
     
  `}
`;

const ProjectText = styled.div`
  display: flex;

  & span {
    font-size: 12px;
    margin-left: 10px;
    font-family: "PretendardVariable";
    font-weight: 250;
  }

  ${media.phone`
    margin-top:10vh
    justify-content: center;
     
    & span{
      font-size: 12px;
      width: 300px;
      margin-top:10vh;
    }
  `}
`;

const CompleteText = styled.div`
  display: flex;

  & span {
    font-size: 12px;
    margin-left: 10px;
    font-family: "PretendardVariable";
    font-weight: 250;
  }

  ${media.phone`
           
      width:100vw;
      justify-content: center;
      order:0;
      & span{
        font-size:10px;
        margin-bottom: 5vh;
        
      }

    `}
`;

const LeftArrow = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
const RightArrow = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const StatisticsHeader = styled.div`
  display: flex;
  align-items: center;
  max-width: 216px;
  width: 15vw;
  justify-content: space-between;

  ${media.phone`
     width:90vw;
     max-width: 390px;
     margin-left:17vw;
     margin-top : 7vh;
  `}
`;

const ProjectBox = styled.div`
  ${media.phone`
          display: flex;
          flex-direction: column; 
          align-items: center;
           width:100%;
           justify-content: center;            
          order:3;
           
         `}
`;

const StatisticsLayout: FC = () => {
  const SToogleState = useRecoilValue(SidebarLayout);
  const [month, setMonth] = useState<number>(4);
  const jwt = useRecoilValue(jwtToken);

  const UserName = useSession().data?.user.name;
  let availableItem = 0;
  let uniqueProjectID: Array<object> = [];
  let uniqueProjectTitle: { title: string; color: string }[] = [];
  let ProgressPercent = 0;
  const { data } = useSWR(
    `https://laoh.site/api/todos/month?year=2024&month=${month}`,
    (uri) => Fetcher(uri, jwt)
  );
  const MostbusyDate =
    data?.body.length === 0 ? 0 : FindMostDate(data?.body)[1];

  const TodoLength = data?.body.length;
  data?.body.forEach((e: any) => {
    e.status === "COMPLETE" ? (availableItem = availableItem + 1) : null;
  });

  ProgressPercent =
    availableItem !== 0 ? Math.round((availableItem * 100) / TodoLength) : 0;

  const ProejctList = data?.body
    .map((item: any) => {
      return item.project !== null && item.project;
    })
    .filter((e: any) => {
      !uniqueProjectID.includes(e.id) &&
        (uniqueProjectID.push(e.id),
        uniqueProjectTitle.push({ title: e.title, color: e.color }));

      return e !== false && e;
    });
  uniqueProjectID = uniqueProjectID.filter((e: any) => e !== undefined);
  uniqueProjectTitle = uniqueProjectTitle.filter(
    (e) => e.title !== undefined && e.color !== undefined
  );

  const MostProejctCount =
    ProejctList.length === 0 ? 0 : FindMostProject(ProejctList)[1];
  const MostProjectTodoCount = data?.body.filter((item: any) => {
    return item.project?.title === MostProejctCount;
  }).length;

  const ProjectavaliveItem =
    ProejctList.length === 0 ? 0 : FindMostProject(ProejctList)[0];

  return (
    <StatisticsMainLayout open={SToogleState.sidebartoggle}>
      <StatisticsHeader>
        <LeftArrow
          src="/Icon/Arrow/leftArrow.png"
          alt="왼쪽 화살표"
          onClick={() => (month == 1 ? setMonth(12) : setMonth(month - 1))}
        />
        <StatisticsHeaderText userName={UserName} month={month} />

        <RightArrow
          src="/Icon/Arrow/rightArrow.png"
          alt="오른쪽 화살표"
          onClick={() => (month == 12 ? setMonth(1) : setMonth(month + 1))}
        />
      </StatisticsHeader>
      <div>
        <StatisticsGrid>
          <CompleteText>
            <h5>일정완료</h5>
            <span>
              {UserName}님은 이번 달 {TodoLength}개의 할 일을 작성했고 그 중{" "}
              {availableItem}
              개를 완료했습니다.
            </span>
          </CompleteText>
          <h5>가장 바빴던날</h5>
          <PlanFlexbox>
            <StatisticsPlan planCount={TodoLength} />
            <StatisticsComplete planPercent={ProgressPercent} />
          </PlanFlexbox>
          <StatisticsMost date={MostbusyDate} />
          <ProjectBox>
            <ProjectText>
              <h5>프로젝트</h5>
              <span>
                {UserName}님은 이번 달 {uniqueProjectID.length}개의 프로젝트를
                진행했고 {MostProejctCount}이 계획된 일정 {MostProjectTodoCount}
                개로 가장 많았습니다.
              </span>
            </ProjectText>
            <StatisticsProject
              project={uniqueProjectTitle}
              maxPercent={MostProjectTodoCount}
              availItem={ProjectavaliveItem}
            />
          </ProjectBox>
        </StatisticsGrid>
      </div>
    </StatisticsMainLayout>
  );
};

export default StatisticsLayout;
