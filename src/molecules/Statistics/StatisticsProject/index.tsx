import { FC } from "react";
import styled from "styled-components";

export interface CompleteProps {
  project: any;
}

const StatisticsProjectLayout = styled.div`
  width: 592px;
  height: 288px;
  background-color: white;
  /* filter: drop-shadow(1px 1px 1px rgba(12, 0, 24, 0.1)); */
  border-radius: 12px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  padding: 25px 25px;
  display: flex;
`;

const StatisticsProjectText = styled.h3`
  font-size: 15px;
  font-family: "PretendardVariable";
  font-weight: 400;
  color: rgba(119, 119, 255, 0.8);
`;

const StatisticsProject: FC<CompleteProps> = ({ project }) => {
  console.log(project);
  return (
    <StatisticsProjectLayout>
      <StatisticsProjectText>프로젝트</StatisticsProjectText>
      {/* <div>{project}</div> */}
    </StatisticsProjectLayout>
  );
};

export default StatisticsProject;
