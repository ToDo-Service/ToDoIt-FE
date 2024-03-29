import { GlobalModal } from "@/reocoil";
import { useRecoilValue } from "recoil";
import ProjectAdd from "@/molecules/PROJECT/ProjectAdd";
import styled from "styled-components";
import NextPlanTodobox from "@/atoms/NextPlan/NextPlanTodobox";
import { useRecoilCallback } from "recoil";
import { useEffect } from "react";

const NextPlanModalLayout = styled.div<{ open: boolean }>`
  width: 26.4583vw;
  height: 83.6914vh;
  max-width: 381px;
  max-height: 857px;
  background-color: white;
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 16px;
  position: absolute;
  left: 800px;
  top: 28px;
  font-family: "Pretendard";
  display: ${(props) => (props.open ? "block" : "none")};
  animation: 0.7s
    ${(props) =>
      props.open !== null && props.open ? "fadeInLeft" : "fadeoutLeft"}
    forwards;
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
  @keyframes fadeoutLeft {
    0% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 0;
      transform: translateZ(0);
      transform: translate3d(100%, 0, 0);
    }
  }
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
  const resetModalState = useRecoilCallback(({ reset }) => () => {
    reset(Modal);
  });

  useEffect(() => {
    window.addEventListener("beforeunload", () => resetModalState);
    return () => {
      window.removeEventListener("beforeunload", () => resetModalState);
    };
  }, []);

  const TestData = [1, 2, 3, 4, 5];

  return (
    <NextPlanModalLayout open={Modal}>
      <NextPlanModalHeader>
        <span>선택 날짜</span>
      </NextPlanModalHeader>
      <ProjectList>
        {TestData.map((item) => (
          <NextPlanTodobox item={item} />
        ))}
      </ProjectList>
      <ProjectAdd
        width="345px"
        comment="+ 할 일을 추가하세요"
        maxwidth="345x"
        minwidth="345px"
      />
    </NextPlanModalLayout>
  );
};

export default NextPlanModal;
