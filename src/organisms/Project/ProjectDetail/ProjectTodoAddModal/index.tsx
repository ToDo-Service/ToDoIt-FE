import Calendar from "@/molecules/Calendar";
import ProejctAddRepeat from "@/molecules/PROJECT/ProjectAddrepeat";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, UpdateData, jwtToken } from "@/reocoil";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Priority from "@/molecules/TO-DO/Priority";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";
import { mutate } from "swr";
import styled from "styled-components";
import { media } from "@/styles/media";

const ModalBackdrop = styled.div<{ ontoggle: boolean }>`
  z-index: 3;
  position: fixed;
  display: ${(props) => (props.ontoggle ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  filter: drop-shadow(3px 3px rgba(12, 0, 24, 0.1));
  border-radius: 10px;
  width: 110%;
  height: 110%;
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
  ${media.phone`
      width:100%;    
        
  `}
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
  margin-bottom: 11px;

  &::placeholder {
    color: #8f8f8f;
  }
  ${media.phone`
     width:300px;
  `}
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

  &::placeholder {
    color: #8f8f8f;
  }
  ${media.phone`
     width:300px;
  `}
`;

const ExitBtn = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 34px;
  margin-left: 370px;
  cursor: pointer;
  ${media.phone`
    margin-left:300px;      
  `}
`;

const SubmitButton = styled.button`
  width: 418px;
  height: 37px;
  background-color: #862ddf;
  margin-top: 11px;
  border-radius: 8px;
  font-family: Pretendard;
  font-weight: 200;
  color: white;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  ${media.phone`
    width: 300px;      
  `}
`;

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  height: 408px;
  width: 598px;
  background-color: #ffffff;
  ${media.phone`
      width:380px;
  `}
`;

const HastTagBox = styled.div`
  width: 418px;
  height: 37px;
  display: flex;
  justify-content: space-between;

  ${media.phone`
    width: 300px;   
      
  `}
`;

export const ProejectTodoAdd = (props: any) => {
  const [endDate, setEndDate] = useState(new Date());
  const [prioirty, setPriority] = useState("높음");
  const [title, onChangeTitle, setTitle] = useInput("");
  const [detail, onChangeDetail, setDetail] = useInput("");
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [repeat, setRepaet] = useState<string>("월요일마다");
  const modal = useRecoilValue(Modal);
  const UData = useRecoilState(UpdateData);
  const JWT = useRecoilValue(jwtToken);
  const setModal = useSetRecoilState(Modal);

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

  const onRewrite = useCallback(
    (e: any) => {
      //서버 전송
      e.preventDefault();
      setPostError("");
      setPostSuccess(false);

      if (title === "") {
        alert("제목을 입력하세요");
        e.preventDefault();
        return;
      }

      axios
        .patch(
          `https://laoh.site/api/todos/${UData[0].id}`,
          {
            title: title,
            content: detail,
            end_date: dayjs(endDate).format("YYYY.MM.DD"),
            project_id: props.projectId,
            priority: prioirty,
            push_status: false,
          },
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
            withCredentials: true,
          }
        )
        .then(() => {
          mutate("https://laoh.site/api/todos/today");
          mutate(`https://laoh.site/api/project/${props.projectId}`);
          setPostSuccess(!postSuccess);
          setModal({ toggle: false });
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response.data);
        })
        .finally(() => {});
    },
    [title, detail, prioirty, endDate]
  );

  const onSubmit = useCallback(
    (e: any) => {
      //서버 전송
      e.preventDefault();
      setPostError("");
      if (title === "") {
        alert("제목을 입력하세요");
        e.preventDefault();
        return;
      }
      if (detail === "") {
        alert("내용을 입력하세요");
        e.preventDefault();
        return;
      }
      axios
        .post(
          "https://laoh.site/api/todos",
          {
            title: title,
            content: detail,
            end_date: dayjs(endDate).format("YYYY.MM.DD"),
            project_id: props.projectId,
            priority: prioirty,
            push_status: false,
          },
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
          }
        )
        .then(() => {
          mutate("https://laoh.site/api/todos/today");
          mutate(`https://laoh.site/api/project/${props.projectId}`);
          setPostSuccess(!postSuccess);
          setModal({ toggle: false });
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response);
        })
        .finally(() => {});
    },
    [title, detail, prioirty, endDate]
  );

  useEffect(() => {
    if (modal.method === "update") {
      setTitle(UData[0].title);
      setDetail(UData[0].content);
      setEndDate(new Date(UData[0].end_date));
      setPriority(UData[0].priority);
    } else {
      setEndDate(new Date());
      setTitle("");
      setDetail("");
      setPriority("높음");
    }
  }, [modal.toggle, postSuccess]);

  return (
    <>
      {modal.toggle && (
        <ModalBackdrop ontoggle={true}>
          <ModalView>
            <ExitBtn
              src="/Icon/Modal/ModalExit.png"
              alt="/"
              onClick={() => setModal({ toggle: false })}
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
                  {modal.method === "update" ? "일정 수정" : "일정 추가"}
                </h1>
                <div
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: "14px",
                    marginBottom: "46px",
                  }}
                >
                  {modal.method === "update"
                    ? "일정을 수정하세요!"
                    : "새로 할 일을 추가해주세요!"}
                </div>
              </div>
            </div>
            <ProjectInputboxMainbox
              placeholder="제목"
              maxLength={10}
              onChange={onChangeTitle}
              value={title}
            />
            <ProjectDetailboxMainbox
              placeholder="설명"
              maxLength={20}
              onChange={onChangeDetail}
              onInput={handleResizeHeight}
              value={detail}
              ref={ref}
            />

            <HastTagBox>
              <Calendar
                method={modal.method === "update" ? "update" : "post"}
                value={endDate}
                setDate={setEndDate}
                width="128px"
                name="오늘"
              />
              <Priority
                method="post"
                setPriority={setPriority}
                value={prioirty}
              />
              <ProejctAddRepeat onChange={setRepaet} value={repeat} />
            </HastTagBox>
            <SubmitButton
              onClick={modal.method === "update" ? onRewrite : onSubmit}
            >
              {modal.method === "update" ? "수정" : "추가"}
            </SubmitButton>
          </ModalView>
        </ModalBackdrop>
      )}
    </>
  );
};
