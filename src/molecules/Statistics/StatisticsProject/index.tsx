import { FC } from "react";
import styled from "styled-components";

export interface CompleteProps {
  project: any;
}

const StatisticsProjectLayout = styled.div`
  width: 41.1111vw;
  max-width: 592px;
  height: 28.125vh;
  max-height: 288px;
  background-color: white;
  /* filter: drop-shadow(1px 1px 1px rgba(12, 0, 24, 0.1)); */
  border-radius: 12px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  padding: 25px 25px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StatisticsProjectText = styled.h3`
  font-size: 15px;
  font-family: "PretendardVariable";
  font-weight: 400;
  color: rgba(119, 119, 255, 0.8);
`;

const Chartbar = styled.div<{ color: string; height: string }>`
  background-color: ${(props) => props.color};
  width: 8px;
  height: ${(props) => props.height};
  border-radius: 2.76px;
`;

const ChartbarContainer = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  height: 100%;

  & > div:not(:last-child) {
    margin-right: 85px;
  }
`;

const LabelChartbar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LabelText = styled.span<{ color: string }>`
  font-size: 12px;
  font-weight: 450;
  margin-top: 16px;
  color: ${(props) => props.color};
`;

const StatisticsProject: FC<CompleteProps> = ({ project }) => {
  console.log(project);

  return (
    <StatisticsProjectLayout>
      <StatisticsProjectText>프로젝트</StatisticsProjectText>

      <ChartbarContainer>
        <LabelChartbar>
          <Chartbar color="#EA98AE" height="50px" />
          <LabelText color="#EA98AE">무역학개론</LabelText>
        </LabelChartbar>
        <LabelChartbar>
          <Chartbar color="#EA98AE" height="50px" />
          <LabelText color="#EA98AE">무역학개론</LabelText>
        </LabelChartbar>
        <LabelChartbar>
          <Chartbar color="#EA98AE" height="50px" />
          <LabelText color="#EA98AE">무역학개론</LabelText>
        </LabelChartbar>
      </ChartbarContainer>
    </StatisticsProjectLayout>
  );
};

export default StatisticsProject;
