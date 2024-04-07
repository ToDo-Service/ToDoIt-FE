import styled from "styled-components";
import Calendar from "@/molecules/Calendar";
import ProejctAddRepeat from "@/molecules/PROJECT/ProjectAddrepeat";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import Priority from "@/molecules/TO-DO/Priority";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";

const ModalBackdrop = styled.div`
  z-index: 4;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  filter: drop-shadow(3px 3px rgba(12, 0, 24, 0.1));
  border-radius: 10px;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 0.5s;
`;

const ProjectInputboxMainbox = styled.input`
  width: 418px;
  height: 37px;
  border-radius: 8px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);

  &::placeholder {
    color: #8f8f8f;
  }
`;

const ProjectDetailboxMainbox = styled.input`
  width: 418px;
  height: 37px;
  border-radius: 8px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);
  margin-top: 11px;

  &::placeholder {
    color: #8f8f8f;
  }
`;

const ExitBtn = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 34px;
  margin-left: 468px;
  cursor: pointer;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  height: 406px;
  width: 598px;
  background-color: #ffffff;
`;

const ProejectModal = (props: any) => {
  const [endDate, setEndDate] = useState(dayjs().format("YYYY.MM.DD"));
  const [prioirty, setPriority] = useState("높음");
  const [title, onChangeTitle, setTitle] = useInput("");
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [detail, onChangeDetail, setDetail] = useInput("");
  const ref = useRef<HTMLInputElement>(null);
  const [repeat, setRepaet] = useState<string>("월요일마다");
  // console.log(props.projectId); 추가 보낼때 디폴트로 프로젝트 ID 담아서 생성

  const JWT = useRecoilValue(jwtToken);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = "37px";
    if (ref.current.scrollHeight <= 60) {
      ref.current.style.height = "37px";
      ref.current.style.height = ref.current.scrollHeight + "px";
    } else {
      ref.current.style.height = "37px";
      ref.current.style.height = "60px";
    }
  }, [ref]);

  return (
    <>
      <ModalBackdrop>
        <ModalView>
          <ExitBtn
            src="/Icon/Modal/ModalExit.png"
            alt="/"
            onClick={props.onclose}
          />
          <div style={{ width: "418px" }}>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontFamily: "Pretendard",
                  fontSize: "32px",
                  marginBottom: "15px",
                }}
              >
                일정 추가
              </h1>
              <div
                style={{
                  fontFamily: "Pretendard",
                  fontSize: "14px",
                  marginBottom: "46px",
                }}
              >
                이번엔 어떤 것을 해볼까요!
              </div>
            </div>
          </div>

          <ProjectInputboxMainbox
            placeholder="제목"
            maxLength={10}
            onChange={onChangeTitle}
          />
          <ProjectDetailboxMainbox
            placeholder="설명"
            maxLength={20}
            onChange={onChangeTitle}
            onInput={handleResizeHeight}
            value={detail}
            ref={ref}
          />

          <div
            style={{
              width: "418px",
              marginTop: "11px",
              height: "37px",
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Calendar setDate={setEndDate} width="128px" name="오늘" />
            <Priority
              method="post"
              setPriority={setPriority}
              value={prioirty}
            />
            <ProejctAddRepeat onChange={setRepaet} value={repeat} />
          </div>
          <div
            // onClick={}
            style={{
              width: "418px",
              height: "37px",
              backgroundColor: "#862DDF",
              marginTop: "11px",
              borderRadius: "8px",
              fontFamily: "Pretendard",
              fontWeight: "200",
              color: "white",
              fontSize: "17px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            추가하기
          </div>
        </ModalView>
      </ModalBackdrop>
    </>
  );
};

export default ProejectModal;
