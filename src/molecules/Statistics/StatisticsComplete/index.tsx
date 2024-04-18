import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export interface CompleteProps {
  planPercent: number;
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
  margin-right: 39px;
`;

const StatisticsComplete: FC<CompleteProps> = ({ planPercent }) => {
  let [percent, setPercent] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    for (let i = 0; i <= planPercent; i++) {
      timeout = setTimeout(() => {
        setPercent(i);
      }, i * 20); // adjust delay as needed
    }

    return () => clearTimeout(timeout);
  }, [planPercent]);

  return (
    <StatisticsCompleteLayout>
      <StatisticsCompleteText> 완료율</StatisticsCompleteText>
      <div
        style={{
          width: "78.96px",
          height: "78.96px",
          fontFamily: "PretendardVariable",
          fontWeight: "450",
        }}
      >
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          styles={buildStyles({
            textSize: "17px",
            pathColor: `rgba(211, 168, 255, 1)`,
            textColor: "rgba(37,37,48,0.8)",
            trailColor: "#E9EDF0",
          })}
        />
      </div>
    </StatisticsCompleteLayout>
  );
};

export default StatisticsComplete;
