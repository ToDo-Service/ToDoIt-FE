import { GlobalModal } from "@/reocoil";
import { useRecoilValue } from "recoil";
import ProjectAdd from "@/molecules/PROJECT/ProjectAdd";
import styled from "styled-components";
import NextPlanTodobox from "@/atoms/NextPlan/NextPlanTodobox";

const NextPlanModalLayout = styled.div`
  width: 26.4583vw;
  height: 83.6914vh;
  background-color: white;
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 16px;
  position: absolute;
  right: 100px;
  top: 135px;
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  align-items: center;
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  animation: fadeInLeft 1s;
`;

const NextPlanModalHeader = styled.header`
  font-size: 20px;
  color: rgba(37, 37, 48, 0.8);
  width: 100%;
  display: flex;
  margin-left: 1.25vw;
  margin-top: 1.7578vh;

  margin-bottom: 3.8086vh;
`;

const ProjectList = styled.section`
  height: 80.4688vh;
  width: 100%;
  & article:not(:first-child) {
    margin-top: 15px;
  }
`;

const NextPlanModal = () => {
  const Modal = useRecoilValue(GlobalModal);
  const TestData = [1, 2, 3, 4, 5];

  return (
    Modal && (
      <NextPlanModalLayout>
        <NextPlanModalHeader>
          <span>선택 날짜</span>
        </NextPlanModalHeader>
        <ProjectList>
          {TestData.map((item) => (
            <NextPlanTodobox item={item} />
          ))}
        </ProjectList>
        <ProjectAdd
          width="23.9583vw"
          comment="+ 할 일을 추가하세요"
          maxwidth="345x"
          minwidth="345px"
        />
      </NextPlanModalLayout>
    )
  );
};

export default NextPlanModal;
