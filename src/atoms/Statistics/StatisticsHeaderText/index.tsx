import { FC } from "react";
import styled from "styled-components";

export interface StatisticsHeaderProps {
  userName: string | null | undefined;
  month: number;
}

const HeaderTextStyle = styled.h3`
  font-size: 20px;
  font-family: "PretendardVariable";
  font-weight: 450;
  margin: 0;
`;

const StatisticsHeaderText: FC<StatisticsHeaderProps> = ({
  userName,
  month,
}) => {
  return (
    <HeaderTextStyle>
      {userName}의 {month}월 요약
    </HeaderTextStyle>
  );
};

export default StatisticsHeaderText;
