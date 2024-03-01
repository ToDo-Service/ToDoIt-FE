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
  justify-content: center;
  height: 23px;

  text-align: center;
  color: white;
  font-family: "Pretendard";
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
  let availableItem = data.body.today_todos.length;
  const maxItem = data.body.today_todos.length;

  console.log(data.body.today_todos);
  data.body.today_todos.map((e: any) => {
    e.status === "INCOMPLETE" ? null : (availableItem -= 1);
  });

  console.log(100 - (availableItem * 100) / maxItem);

  return (
    <ProgressBar>
      <Progress width={100 - (availableItem * 100) / maxItem}>
        {100 - (availableItem * 100) / maxItem === 0
          ? 100 - (availableItem * 100) / maxItem
          : `${100 - (availableItem * 100) / maxItem}%`}
      </Progress>
    </ProgressBar>
  );
};

export default ProgressBarComponent;
