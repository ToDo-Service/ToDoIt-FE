import { useState } from "react";
import styled from "styled-components";

const ProjectColorMainbox = styled("div")<{ bgcolor: string }>`
  width: 125px;
  height: 37px;
  border-radius: 8px;
  /* background-color: rgba(254, 152, 174, 0.15); */
  background-color: ${(props) => props.bgcolor};

  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);
  padding-left: 11px;
  font-size: 14px;
  color: #8f8f8f;
`;

const SelectedColor = styled.div`
  display: flex;
  align-items: center;
`;

const SelectedColorText = styled("div")<{ color: string }>`
  font-size: 10px;
  color: ${(props) => props.color};
`;

const SelectedColorIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

const ProjectColorTextBox = styled.div`
  width: 77px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ColorData = [
  {
    id: 1,
    text: "핑크",
    img: "/Icon/Color/pink.png",
    color: "#EA98AE",
    backgroundColor: "rgba(234, 152, 174, 0.15)",
  },
  {
    id: 2,
    text: "옐로우",
    img: "/Icon/Color/yellow.png",
    color: "#FBD580",
    backgroundColor: "rgba(251, 213, 128, 0.15)",
  },
  {
    id: 3,
    text: "블루",
    img: "/Icon/Color/blue.png",
    color: "#9ECAFB",
    backgroundColor: "rgba(158, 202, 251, 0.15)",
  },
  {
    id: 4,
    text: "퍼플",
    img: "/Icon/Color/pupple.png",
    color: "#CCBAF8",
    backgroundColor: "rgba(204, 186, 248, 0.15)",
  },
  {
    id: 5,
    text: "그레이",
    img: "/Icon/Color/gray.png",
    color: "#9F9EA4",
    backgroundColor: "rgba(159, 158, 164, 0.15)",
  },
];

const ProjectColor = () => {
  const [text, setText] = useState("핑크");
  const [color, setColor] = useState("#EA98AE");
  const [Bgcolor, setBgColor] = useState("rgba(234, 152, 174, 0.15)");

  return (
    <ProjectColorMainbox bgcolor={Bgcolor}>
      <ProjectColorTextBox>
        <div>색상</div>
        <SelectedColor>
          <SelectedColorIcon src="/Icon/Color/pink.png" alt="색상 아이콘" />
          <SelectedColorText color={color}>핑크</SelectedColorText>
        </SelectedColor>
      </ProjectColorTextBox>
    </ProjectColorMainbox>
  );
};

export default ProjectColor;
