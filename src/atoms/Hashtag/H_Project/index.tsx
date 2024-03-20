import styled from "styled-components";

const ColorData = [
  {
    id: 1,
    text: "핑크",
    color: "#EA98AE",
    backgroundColor: "rgba(234, 152, 174, 0.15)",
  },
  {
    id: 2,
    text: "옐로우",

    color: "#FBD580",
    backgroundColor: "rgba(251, 213, 128, 0.15)",
  },
  {
    id: 3,
    text: "블루",

    color: "#9ECAFB",
    backgroundColor: "rgba(158, 202, 251, 0.15)",
  },
  {
    id: 4,
    text: "퍼플",

    color: "#CCBAF8",
    backgroundColor: "rgba(204, 186, 248, 0.15)",
  },
  {
    id: 5,
    text: "그레이",
    color: "#9F9EA4",
    backgroundColor: "rgba(159, 158, 164, 0.15)",
  },
];

const Hasttag = styled.div<{ Bgcolor: string }>`
  width: 75px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background-color: ${(props) => props.Bgcolor};
  color: #8f8f8f;
  font-size: 14px;
  font-family: "Pretendard";
  border: 1px solid rgba(197, 197, 197, 0.5);
`;

const HashtagProject = ({ project }: any) => {
  const SelectedProject = ColorData.filter((item) => {
    if (project) {
      return item.color === project.color && item.backgroundColor;
    }
  });

  return project !== null ? (
    <Hasttag Bgcolor={SelectedProject[0].backgroundColor}>{project.id}</Hasttag>
  ) : undefined;
};

export default HashtagProject;
