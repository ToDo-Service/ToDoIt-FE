import styled from "styled-components";

const Hasttag = styled("div")<{ bgColor: string }>`
  width: 110px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid rgba(197, 197, 197, 0.5);
`;

const RankText = styled.span`
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Pretendard";
`;

const Degree = styled("span")<{ Color: string }>`
  color: ${(props) => props.Color};
  font-size: 10px;
  font-family: "Pretendard";
`;

const PriorityData = [
  {
    id: 1,
    text: "높음",
    color: "#ff8080",
    bgcolor: "rgba(255, 190, 190, 0.27)",
  },
  {
    id: 2,
    text: "보통",
    color: "#FB9A09",
    bgcolor: "rgba(255, 191, 133, 0.27)",
  },
  {
    id: 3,
    text: "낮음",
    color: "#5B9970",
    bgcolor: "rgba(190, 231, 194, 0.27)",
  },
];

const HashtagPriority = ({ priority }: any) => {
  return PriorityData.map((e) => {
    return e.text === priority ? (
      <Hasttag bgColor={e.bgcolor}>
        <RankText>우선 순위</RankText>
        <Degree Color={e.color}>{priority}</Degree>
      </Hasttag>
    ) : null;
  });
};

export default HashtagPriority;
