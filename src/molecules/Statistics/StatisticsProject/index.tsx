import { Hash } from "crypto";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

export interface CompleteProps {
  project: any;
  availItem: Map<string, number>;
  maxPercent: number;
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

const Chartbar = styled.div<{ color: string; height: number }>`
  background-color: ${(props) => props.color};
  width: 8px;
  height: ${(props) => `${props.height}%`};
  border-radius: 2.76px;
  max-height: 158px;
  bottom: 0;
  position: absolute;
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
  opacity: 0.8;
`;

const ChartbarBackground = styled.div`
  height: 158px;
  position: relative;
`;

const StatisticsProject: FC<CompleteProps> = ({
  project,
  availItem,
  maxPercent,
}) => {
  let ProjectAll: Array<object> = [];

  project.map((item: any) => {
    [...availItem].map((e) => {
      return (
        e[0] === item.title &&
        ProjectAll.push({
          title: item.title,
          color: item.color,
          count: e[1],
        })
      );
    });
  });

  return (
    <StatisticsProjectLayout>
      <StatisticsProjectText>프로젝트</StatisticsProjectText>

      <ChartbarContainer>
        {ProjectAll.map((projectItem: any) => {
          return (
            <LabelChartbar>
              <ChartbarBackground>
                <Chartbar
                  color={projectItem.color}
                  height={(100 / maxPercent) * projectItem.count}
                />
              </ChartbarBackground>
              <LabelText color={projectItem.color}>
                {projectItem.title}
              </LabelText>
            </LabelChartbar>
          );
        })}
      </ChartbarContainer>
    </StatisticsProjectLayout>
  );
};

export default StatisticsProject;
