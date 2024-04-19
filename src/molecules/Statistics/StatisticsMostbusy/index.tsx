import { jwtToken } from "@/reocoil";
import Fetcher from "@/utils/fetcher";
import dayjs from "dayjs";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useSWR from "swr";
import StatisticsMostbusyBox from "../StatisticsMostbusyBox";

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
  flex-direction: column;
  align-items: start;
`;

const StatisticsMostText = styled.h3`
  font-size: 15px;
  font-family: "PretendardVariable";
  font-weight: 400;
  color: rgba(119, 119, 255, 0.8);
`;

const StatisticsMostul = styled.ul`
  margin: 10px 0;
  padding: 0;

  & li:not(:last-child) {
    margin-bottom: 11px;
  }
`;

const StatisticsMost: FC<CompleteProps> = ({ date }) => {
  const DateForm = dayjs(date).format("M월 DD일");
  const jwt = useRecoilValue(jwtToken);
  const { data } = useSWR(
    jwt && date && `https://laoh.site/api/todos/day?date=${date}`,
    (uri: string) => Fetcher(uri, jwt)
  );

  return (
    <StatisticsMostLayout>
      <StatisticsMostText>{DateForm}</StatisticsMostText>
      <StatisticsMostul>
        {data?.body.map((item: any) => {
          return <StatisticsMostbusyBox title={item.title} />;
        })}
      </StatisticsMostul>
    </StatisticsMostLayout>
  );
};

export default StatisticsMost;
