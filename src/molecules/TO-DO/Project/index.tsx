import { useState, useEffect, Suspense, MouseEvent } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { UpdateData, jwtToken } from "@/reocoil";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { ColorData } from "@/data/Color";
import FindColor from "@/utils/findColor";

const ProjectContainer = styled.div<{ bgcolor: string }>`
  cursor: pointer;
  width: 168px;
  background-color: ${(props) => props.bgcolor};
  border: 1px solid rgba(12, 0, 24, 0.1);
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
  height: fit-content;
  padding-left: 14px;
  padding-top: 10px;
  padding-bottom: 10px;

  & div:not(:first-child) {
    margin-top: 13px;
  }
`;

const ProjectListitem = styled("div")<{ color: string }>`
  cursor: pointer;
  color: ${(props) => props.color};
`;

const SelectedProject = styled("span")<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 10px;
`;

const Project = ({ setProject, value }: any) => {
  const [projectopen, setProjectOpen] = useState(false);
  const jwt = useRecoilValue(jwtToken);
  const { data } = useSWR(
    jwt.token !== "" && "https://laoh.site/api/project",
    (url) => fetcher(url, jwt)
  );
  const modalprojectOpen = (e: any) => {
    if (data.body.length === 0) {
      alert("등록된 프로젝트가 없습니다.");
      e.preventDefault();
      return;
    }

    setProjectOpen(!projectopen);
  };

  console.log(data.body.length);

  const onSelect = (e: any) => {
    setProject({
      title: e.target.innerHTML,
      id: e.target.id,
      color: e.target.classList[2],
      bgColor: FindColor(e.target.classList[2])[0].backgroundColor,
    });
  };

  return (
    <ProjectContainer
      bgcolor={value.bgColor}
      onClick={(e) => modalprojectOpen(e)}
    >
      <span>프로젝트</span>
      <SelectedProject color={value.color}>{value.title}</SelectedProject>
      <ProjectWrapper priorityisopen={projectopen ? 1 : 0}>
        <Projectlist>
          {data?.body.map((item: any) => {
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
