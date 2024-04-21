import styled from "styled-components";
import { ColorData } from "@/data/Color";

const Hasttag = styled.div<{ Bgcolor: string }>`
  width: 75px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: ${(props) => props.Bgcolor};
  color: #8f8f8f;
  font-size: 12px;
  font-family: "PretendardVariable";
  font-weight: 250;
  border: 1px solid rgba(197, 197, 197, 0.5);
  font-family: "PretendardVariable";
  font-weight: 250;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HashtagProject = ({ project }: any) => {
  const SelectedProject = ColorData.filter((item) => {
    if (project) {
      return item.color === project.color && item.backgroundColor;
    }
  });

  return (
    project !== null && (
      <Hasttag Bgcolor={SelectedProject[0].backgroundColor}>
        {project.title}
      </Hasttag>
    )
  );
};

export default HashtagProject;
