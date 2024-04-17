import { FC } from "react";
import styled from "styled-components";

export interface CompleteProps {
  planCount: number;
}

const StatisticsCompleteLayout = styled.div`
  width: 285px;
  height: 126px;
  background-color: white;
  /* filter: drop-shadow(1px 1px 1px rgba(12, 0, 24, 0.1)); */
  border-radius: 12px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  padding: 25px 25px;
  display: flex;
`;

const StatisticsCompleteText = styled.h3`
  font-size: 15px;
  font-family: "PretendardVariable";
  font-weight: 400;
  color: rgba(119, 119, 255, 0.8);
`;

const StatisticsComplete: FC<CompleteProps> = ({ planCount }) => {
  return (
    <StatisticsCompleteLayout>
      <StatisticsCompleteText> 완료율</StatisticsCompleteText>
      <div>원형 그래프</div>
    </StatisticsCompleteLayout>
  );
};

export default StatisticsComplete;
