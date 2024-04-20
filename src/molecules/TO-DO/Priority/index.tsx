import { media } from "@/styles/media";
import { useEffect, useState } from "react";

import styled from "styled-components";

const PriorityContainer = styled("div")<{ color: string; bgcolor: string }>`
  width: 110px;
  background-color: ${(props) => props.bgcolor};
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: "PretendardVariable";
  font-weight: 250;
  position: relative;
  cursor: pointer;

  & span:first-child {
    color: #8f8f8f;
    font-size: 14px;
    cursor: pointer;
    ${media.phone`
    font-size: 10px;
    `}
  }

  & span:nth-child(2) {
    cursor: pointer;
    color: ${(props) => props.color};
    font-size: 10px;
  }
`;

const PriorityWrapper = styled("div")<{ priorityisopen: number }>`
  display: ${(props) => (props.priorityisopen ? "block" : "none")};
  width: 52px;
  height: 85px;
  background-color: white;
  z-index: 11;
  position: absolute;
  top: 130%;
  left: 55%;
  border-radius: 8px;
  border: 0.8px solid var(--festie-gray-600, #949494);
`;

const Prioritylist = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Pretendard";
  font-size: 12px;
  height: 100%;

  & div:nth-child(1) {
    color: #ff8080;
  }
  & div:nth-child(2) {
    color: #fb9a09;
  }
  & div:nth-child(3) {
    color: #5b9970;
  }
`;

const PriorityData = [
  {
    id: 1,
    text: "높음",
    img: "/Icon/Prority/높음.png",
    color: "#ff8080",
    bgcolor: "rgba(255, 190, 190, 0.27)",
  },
  {
    id: 2,
    text: "보통",
    img: "/Icon/Prority/보통.png",
    color: "#FB9A09",
    bgcolor: "rgba(255, 191, 133, 0.27)",
  },
  {
    id: 3,
    text: "낮음",
    img: "",
    color: "#5B9970",
    bgcolor: "rgba(190, 231, 194, 0.27)",
  },
];

const Priority = (props: any) => {
  const [color, setColor] = useState("#ff8080");
  const [bgcolor, setBgcolor] = useState("rgba(255, 190, 190, 0.27)");
  const [img, setImg] = useState("/Icon/Prority/높음.png");
  const [priorityopen, setPrioirtyOpen] = useState(false);
  const modalpriorityOpen = () => {
    setPrioirtyOpen(!priorityopen);
  };

  const find = (e: any) => {
    props.setPriority(e.target.innerHTML);
    PriorityData.map((p) => {
      if (p.text === e.target.innerHTML) {
        props.setPriority(p.text);
        setColor(p.color);
        setBgcolor(p.bgcolor);
        setImg(p.img);
      }
    });
  };
  useEffect(() => {
    PriorityData.map((p) => {
      if (p.text === props.value) {
        setColor(p.color);
        setBgcolor(p.bgcolor);
      }
    });
  }, [props.value]);

  return (
    <PriorityContainer
      onClick={modalpriorityOpen}
      color={color}
      bgcolor={bgcolor}
    >
      <span>우선 순위</span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          width: "27.69px",
          justifyContent: "space-between",
        }}
      >
        {props.value}
        {img !== "" && (
          <img width="8.69px" height="10px" src={`${img}`} alt="불이모지" />
        )}
      </span>
      <PriorityWrapper priorityisopen={priorityopen ? 1 : 0}>
        <Prioritylist>
          {PriorityData.map((e) => {
            return (
              <div onClick={find} key={e.id}>
                {e.text}
              </div>
            );
          })}
        </Prioritylist>
      </PriorityWrapper>
    </PriorityContainer>
  );
};

export default Priority;
