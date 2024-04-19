import { FC } from "react";
import styled from "styled-components";

const StatisticsMostbusyMainbox = styled.li<{ bgColor: string }>`
  margin: 0 auto;
  padding: 0;
  /* width: 23.9583vw;
  height: 7.2266vh; */
  width: 345px;
  height: 50px;
  /* max-width: 345px;
  max-height: 74px; */
  background-color: ${(props) => props.bgColor};
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 12px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 29px;
`;

const StatisticsMostbusyTitle = styled.h3`
  font-size: 15px;
  font-family: "PretendardVariable";
  font-weight: 450;
  margin: 0;
  padding: 0;
`;

interface TodoProps {
  title: string;
}

const StatisticsMostbusyBox: FC<TodoProps> = ({ title }) => {
  return (
    <StatisticsMostbusyMainbox bgColor="rgba(255,189,62,0.1)">
      <StatisticsMostbusyTitle>{title}</StatisticsMostbusyTitle>
    </StatisticsMostbusyMainbox>
  );
};

export default StatisticsMostbusyBox;
