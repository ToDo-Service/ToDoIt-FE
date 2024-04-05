import styled from "styled-components";

const Hasttag = styled("div")<{ bgcolor: string }>`
  width: 100px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: ${(props) => props.bgcolor};
  border: 1px solid rgba(197, 197, 197, 0.5);
  font-family: "PretendardVariable";
  font-weight: 250;
`;

const RankText = styled.span`
  color: #8f8f8f;
  font-size: 14px;
  font-family: "PretendardVariable";
  font-weight: 250;
`;

const Degree = styled("span")<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 10px;
  font-family: "PretendardVariable";
  font-weight: 250;
  display: flex;
  align-items: center;
  width: "27.69px";
  justify-content: space-between;
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

const HashtagPriority = ({ priority }: any) => {
  return PriorityData.map((e) => {
    return e.text === priority ? (
      <Hasttag bgcolor={e.bgcolor}>
        <RankText>우선 순위</RankText>

        <Degree color={e.color}>
          {priority}
          <img width="8.69px" height="10px" src={`${e.img}`} alt="불이모지" />
        </Degree>
      </Hasttag>
    ) : null;
  });
};

export default HashtagPriority;
