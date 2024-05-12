import { FC } from "react";
import { ProjectDetailBoxLayout } from "./styles";

interface ProjectDetailBoxProps {
  title: string;
  detail: string;
}

const ProjectDetailBox: FC<ProjectDetailBoxProps> = ({ title, detail }) => {
  return (
    <ProjectDetailBoxLayout>
      <div>{title}</div>
      <div>{detail}</div>
    </ProjectDetailBoxLayout>
  );
};

export default ProjectDetailBox;
