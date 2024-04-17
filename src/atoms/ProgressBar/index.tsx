import { jwtToken } from "@/reocoil";
import Fetcher from "@/utils/fetcher";
import { useRecoilValue } from "recoil";

import styled from "styled-components";
import useSWR from "swr";

const ProgressBar = styled("div")`
  width: 144px;
  height: 23px;
  background-color: rgba(12, 0, 24, 0.1);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  overflow: hidden;
`;

const Progress = styled("div")<{ width: number }>`
  display: flex;
  align-items: center;
  width: ${(props) => props.width}%;
  transition: 0.5s ease-in-out;
  justify-content: center;
  height: 23px;
  text-align: center;
  color: white;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: 10px;
  background-color: ${(props) =>
    props.width < 50 ? "rgba(12, 0, 24, 0.5)" : "rgba(255, 98, 98, 0.7)"};
`;

const ProgressBarComponent = () => {
  const JwtToken = useRecoilValue(jwtToken);
  const { data, error, isLoading } = useSWR(
    "https://laoh.site/api/todos/today",
    (url) => Fetcher(url, JwtToken)
  );

  let availableItem: number = data.body.today_todos.length;
  const maxItem: number = data.body.today_todos.length;

  data.body.today_todos.map((e: any) => {
    e.status === "INCOMPLETE" ? null : (availableItem -= 1);
  });
  let ProgressPercent = Math.round(100 - (availableItem * 100) / maxItem);
  if (isNaN(ProgressPercent)) {
    ProgressPercent = 0;
  }

  if (maxItem === 0) {
    return undefined;
  } else {
    return (
      <ProgressBar>
        <Progress width={100 - (availableItem * 100) / maxItem}>
          {ProgressPercent === 0 ? undefined : `${ProgressPercent}%`}
        </Progress>
      </ProgressBar>
    );
  }
};

export default ProgressBarComponent;
