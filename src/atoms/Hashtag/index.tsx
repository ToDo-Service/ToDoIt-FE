import styled from "styled-components";

const Hasttag = styled.div`
  width: 110px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: ${(props) =>
    props.color ? props.color : "rgba(255,190,190,0.27)"};
  margin-left: 27px;
  margin-top: 12px;

  border: 1px solid rgba(197, 197, 197, 0.5);
`;

const RankText = styled.span`
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Pretendard";
`;

const Degree = styled.span`
  color: #ff8080;
  font-size: 10px;
  font-family: "Pretendard";
`;

const Hashtag = ({ color }: any) => {
  return (
    <Hasttag color={color}>
      <RankText>우선 순위</RankText>
      <Degree>높음</Degree>
    </Hasttag>
  );
};

export default Hashtag;
