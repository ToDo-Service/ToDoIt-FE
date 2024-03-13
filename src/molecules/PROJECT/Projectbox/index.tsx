import styled from "styled-components";

const ProjectboxMainbox = styled.div<{
  color: string;
  bgColor: string | undefined;
}>`
  width: 790px;
  height: 55px;
  border-radius: 12px;
  padding-left: 25px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);
`;

interface ProjectData {
  title: string;
  description: string;
  color: string;
}

const ColorData = [
  {
    color: "#EA98AE",
    backgroundColor: "rgba(234, 152, 174, 0.15)",
  },
  {
    color: "#FBD580",
    backgroundColor: "rgba(251, 213, 128, 0.15)",
  },
  {
    color: "#9ECAFB",
    backgroundColor: "rgba(158, 202, 251, 0.15)",
  },
  {
    color: "#CCBAF8",
    backgroundColor: "rgba(204, 186, 248, 0.15)",
  },
  {
    color: "#9F9EA4",
    backgroundColor: "rgba(159, 158, 164, 0.15)",
  },
];

const Projectbox = ({ title, description, color }: ProjectData) => {
  const SelectedColor = ColorData.find((item) => item.color === color);

  return (
    <ProjectboxMainbox color={color} bgColor={SelectedColor?.backgroundColor}>
      <span>{description}</span>
    </ProjectboxMainbox>
  );
};

export default Projectbox;
