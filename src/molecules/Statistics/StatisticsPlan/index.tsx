import { FC } from "react";
import styled from "styled-components";

export interface CompleteProps {
  planCount: number;
}

const StatisticsPlanLayout = styled.div`
  width: 285px;
  height: 126px;
  background-color: white;
  /* filter: drop-shadow(1px 1px 1px rgba(12, 0, 24, 0.1)); */
  border-radius: 12px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  padding: 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 25px;
`;

const StatisticsPlanText = styled.h3`
  font-size: 15px;
  font-family: "PretendardVariable";
  font-weight: 400;
  color: rgba(119, 119, 255, 0.8);
`;

const StatisticsPlanCount = styled.h3`
  font-size: 20px;
  font-family: "PretendardVariable";
  font-weight: 400;
  color: rgba(37, 37, 48, 0.8);
`;

const StatisticsPlan: FC<CompleteProps> = ({ planCount }) => {
  return (
    <StatisticsPlanLayout>
      <StatisticsPlanText>계획된 일정</StatisticsPlanText>
      <StatisticsPlanCount>{planCount}개</StatisticsPlanCount>
    </StatisticsPlanLayout>
  );
};

export default StatisticsPlan;
