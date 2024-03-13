import { useState } from "react";
import styled from "styled-components";

const ProjectColorMainbox = styled("div")<{ bgcolor: string }>`
  width: 125px;
  height: 37px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.bgcolor};
  position: relative;
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
  margin-left: 20px;
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
  width: max-content;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ColorToggleUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: absolute;

  padding: 0;
  width: 83px;
  height: 120px;
  stroke: rgba(12, 0, 24, 0.1);
  background-color: white;
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 8px;
  top: 41px;
  left: 186px;
  padding-left: 14px;
  padding-top: 10px;
  list-style: none;

  & li:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ColorToggleLi = styled.li`
  cursor: pointer;
  width: max-content;
  height: 12px;
  line-height: 0;

  & span {
    font-size: 10px;
    color: #8f8f8f;
    margin-left: 5px;
  }
`;

const ToggleColorImg = styled.img`
  width: 10px;
  height: 10px;
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

const ProjectColor = ({ onChangeColor }: any) => {
  const [text, setText] = useState<string | undefined>("핑크");
  const [color, setColor] = useState<string>("#EA98AE");
  const [Bgcolor, setBgColor] = useState<string>("rgba(234, 152, 174, 0.15)");
  const [img, setImg] = useState<string>("/Icon/Color/pink.png");
  const [istoggle, setIstoggle] = useState(false);

  const onToogle = () => {
    setIstoggle(!istoggle);
  };

  const onSetColor = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLSpanElement;
    const SelectedColor = ColorData.find(
      (color) => color.text == target.innerHTML
    );
    setColor(SelectedColor?.color as string);
    setBgColor(SelectedColor?.backgroundColor as string);
    setText(SelectedColor?.text as string);
    setImg(SelectedColor?.img as string);
    onChangeColor(SelectedColor?.color as string);
    onToogle();
  };

  return (
    <>
      <ProjectColorMainbox bgcolor={Bgcolor} onClick={onToogle}>
        <ProjectColorTextBox>
          <div>색상</div>
          <SelectedColor>
            <SelectedColorIcon src={`${img}`} alt="색상 아이콘" />
            <SelectedColorText color={color}>{text}</SelectedColorText>
          </SelectedColor>
        </ProjectColorTextBox>
      </ProjectColorMainbox>
      {istoggle ? (
        <ColorToggleUl>
          {ColorData.map((item) => {
            return (
              <ColorToggleLi key={item.id} onClick={onSetColor}>
                <ToggleColorImg src={item.img} alt="색상 이미지" />
                <span>{item.text}</span>
              </ColorToggleLi>
            );
          })}
        </ColorToggleUl>
      ) : undefined}
    </>
  );
};

export default ProjectColor;
