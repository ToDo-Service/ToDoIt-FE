import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { UpdateData, jwtToken } from "@/reocoil";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const ProjectContainer = styled.div<{ bgcolor: string }>`
  width: 168px;
  background-color: ${(props) => props.bgcolor};
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  padding-right: 30px;
  font-family: "Pretendard";

  & span:first-child {
    color: #8f8f8f;
    font-size: 14px;
  }
`;
const ProjectWrapper = styled("div")<{ priorityisopen: number }>`
  display: ${(props) => (props.priorityisopen ? "block" : "none")};
  width: 106px;

  height: max-content;
  background-color: white;
  z-index: 11;
  position: absolute;
  top: 130%;
  left: 37%;
  border-radius: 8px;
  border: 0.8px solid var(--festie-gray-600, #949494);
`;

const Projectlist = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  font-family: "Pretendard";
  color: #8f8f8f;
  font-size: 10px;
  height: 100%;
  padding-left: 14px;
  padding-top: 10px;
  padding-bottom: 10px;

  & div:not(:first-child) {
    margin-top: 13px;
  }
`;

const ProjectListitem = styled("div")<{ color: string }>`
  color: ${(props) => props.color};
`;

const SelectedProject = styled("span")<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 10px;
`;
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

const Project = ({ onChange, value, method }: any) => {
  const toggle = useRecoilValue(UpdateData);
  const [project, setProject] = useState(
    method === "update" ? toggle?.project?.id : ""
  );
  const [projectopen, setProjectOpen] = useState(false);
  const [color, setColor] = useState("");
  const [bgColor, setBgColor] = useState("rgba(251, 213, 128, 0.15)");
  const jwt = useRecoilValue(jwtToken);
  const { data, error, isLoading } = useSWR(
    jwt.token !== "" ? "https://laoh.site/api/project" : undefined,
    (url) => fetcher(url, jwt)
  );
  const modalprojectOpen = () => {
    setProjectOpen(!projectopen);
  };

  useEffect(() => {
    if (toggle.project) {
      ColorData.map((p) => {
        if (p.color === toggle.project.color) {
          setColor(p.color);
          setBgColor(p.backgroundColor);
        }
      });
    }
  }, [project]);

  const onSelect = (e: any) => {
    onChange({ title: e.target.innerHTML, id: e.target.id });
    setProject(e.target.innerHTML);
    setColor(e.target.classList[2]);
    ColorData.map((item) => {
      item.color === e.target.classList[2]
        ? setBgColor(item.backgroundColor)
        : undefined;
    });
  };

  return (
    <ProjectContainer bgcolor={bgColor} onClick={modalprojectOpen}>
      <span>프로젝트</span>
      <SelectedProject color={color}>{project}</SelectedProject>
      <ProjectWrapper priorityisopen={projectopen ? 1 : 0}>
        <Projectlist>
          {data.body.map((item: any) => {
            return (
              <ProjectListitem
                id={item.id}
                className={item.color}
                color={item.color}
                onClick={onSelect}
              >
                {item.title}
              </ProjectListitem>
            );
          })}
        </Projectlist>
      </ProjectWrapper>
    </ProjectContainer>
  );
};

export default Project;
