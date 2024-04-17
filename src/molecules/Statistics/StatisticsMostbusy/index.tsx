import { FC } from "react";
import styled from "styled-components";

export interface CompleteProps {
  date: string;
}

const StatisticsMostLayout = styled.div`
  width: 395px;
  height: 502px;
  background-color: white;
  /* filter: drop-shadow(1px 1px 1px rgba(12, 0, 24, 0.1)); */
  border-radius: 12px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  padding: 25px 25px;
  display: flex;
`;

const StatisticsMostText = styled.h3`
  font-size: 15px;
  font-family: "PretendardVariable";
  font-weight: 400;
  color: rgba(119, 119, 255, 0.8);
`;

const StatisticsMost: FC<CompleteProps> = ({ date }) => {
  return (
    <StatisticsMostLayout>
      <StatisticsMostText>{date}</StatisticsMostText>
    </StatisticsMostLayout>
  );
};

export default StatisticsMost;
