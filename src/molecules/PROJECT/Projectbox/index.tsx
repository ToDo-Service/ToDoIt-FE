import styled from "styled-components";

const ProjectboxMainbox = styled.div`
  width: 790px;
  height: 55px;
  border-radius: 12px;
  padding-left: 25px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);
`;

const Projectbox = () => {
  return <ProjectboxMainbox>프로젝트 박스</ProjectboxMainbox>;
};

export default Projectbox;
