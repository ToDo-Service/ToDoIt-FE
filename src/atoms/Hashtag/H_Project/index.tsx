import { FC } from "react";
import styled from "styled-components";

const Hasttag = styled.div`
  width: 75px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: rgba(255, 189, 62, 0.1);
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Pretendard";
  border: 1px solid rgba(197, 197, 197, 0.5);
`;

interface Props {
  project: string | null;
}

const HashtagProject: FC<Props> = ({ project }) => {
  return project !== null ? (
    <Hasttag>{project}</Hasttag>
  ) : (
    <Hasttag>없음</Hasttag>
  );
};

export default HashtagProject;
