import styled from "styled-components";

const ProjectInputboxMainbox = styled.input`
  width: 790px;
  height: 55px;
  border-radius: 12px;
  padding-left: 25px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);
`;

interface Props {
  SearchProject: (e: any) => void;
}

const Projectbox = ({ SearchProject }: Props) => {
  return (
    <ProjectInputboxMainbox
      placeholder="이름으로 검색하세요"
      onChange={SearchProject}
    />
  );
};

export default Projectbox;
