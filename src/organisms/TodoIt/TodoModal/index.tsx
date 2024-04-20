import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { jwtToken, Modal, UpdateData } from "@/reocoil";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";
import { mutate } from "swr";
import { AnimatePresence } from "framer-motion";
import Calendar from "@/molecules/Calendar";
import Project from "@/molecules/TO-DO/Project";
import Priority from "@/molecules/TO-DO/Priority";
import FindColor from "@/utils/findColor";
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
  ${media.phone`
      width:120%;
      
  `}

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

const ExitBtn = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 34px;
  margin-left: 537px;
  cursor: pointer;
  ${media.phone`
    margin-left:300px;
      
  `}
`;

const AddTodo = styled.div`
  cursor: pointer;
  width: 320px;
  height: 55px;
  background-color: rgba(12, 0, 24, 0.1);
  border-radius: 12px;
  margin-top: 15px;
  display: flex;
  padding-left: 24px;
  align-items: center;
  font-family: "PretendardVariable";
  font-weight: 250;
  font-size: 15px;
  color: rgba(37, 37, 48, 0.6);

  &:hover {
    background-color: rgba(12, 0, 24, 0.38);
    transition: 0.5s ease-in-out;
  }
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
  ${media.phone`
      width:380px;
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

const HastTagBox = styled.div`
  width: 418px;
  height: 37px;
  display: flex;
  justify-content: space-between;

  ${media.phone`
    width: 300px;      
  `}
`;

const FormBox = styled.div`
  width: 418px;

  ${media.phone`
    width: 300px;      
  `}
`;

const TodoModal = (props: any) => {
  const [method, setMethod] = useState(props.method);
  const [endDate, setEndDate] = useState(new Date());
  const [title, onChangeTitle, setTitle] = useInput("");
  const [detail, onChangeDetail, setDetail] = useInput("");
  const [prioirty, setPriority] = useState("높음");
  const [project, setProject] = useState({
    id: null,
    title: "선택 안함",
    color: "#8f8f8f",
    bgColor: "#ffffff",
  });
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const JWT = useRecoilValue(jwtToken);
  const ref = useRef<HTMLTextAreaElement>(null);
  const modal = useRecoilValue(Modal);
  const setModal = useSetRecoilState(Modal);
  const UData = useRecoilState(UpdateData);

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
        alert("내욜을 입력하세요");
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
            project_id: project.id,
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
          setPostSuccess(!postSuccess);
          setModal({ toggle: false });
        })
        .catch((err) => {
          setPostError(err.response);
        })
        .finally(() => {});
    },
    [title, detail, prioirty, endDate, project]
  );

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
            end_date: endDate,
            project_id: project.id,
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
          setPostSuccess(!postSuccess);
          setModal({ toggle: false });
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response.data);
        })
        .finally(() => {});
    },
    [title, detail, prioirty, endDate, project]
  );

  useEffect(() => {
    if (modal.method === "update") {
      setTitle(UData[0].title);
      setDetail(UData[0].content);
      setEndDate(new Date(UData[0].end_date));
      setPriority(UData[0].priority);

      setProject({
        id: UData[0]?.project?.id,
        title: UData[0]?.project?.title,
        color: UData[0]?.project?.color,
        bgColor: FindColor(UData[0]?.project?.color)[0]?.backgroundColor,
      });
    } else {
      setEndDate(new Date());
      setTitle("");
      setDetail("");
      setPriority("높음");
      setProject({
        id: null,
        title: "선택 안함",
        color: "#8f8f8f",
        bgColor: "#ffffff",
      });
    }
  }, [modal.toggle, postSuccess]);

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
    console.log("ref!", ref.current.style.height);
  }, [ref, modal.toggle]);

  return (
    <AnimatePresence>
      {method === "post" && (
        <AddTodo
          onClick={() => setModal({ id: 0, method: "post", toggle: true })}
        >
          <span>+ 할 일을 추가해주세요</span>
        </AddTodo>
      )}
      {modal.toggle && (
        <ModalBackdrop ontoggle={true}>
          <ModalView>
            <ExitBtn
              src="/Icon/Modal/ModalExit.png"
              alt="/"
              onClick={() => setModal({ toggle: false })}
            />
            <FormBox>
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
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={onChangeTitle}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="설명"
                    maxLength={20}
                    ref={ref}
                    value={detail}
                    onInput={handleResizeHeight}
                    style={{ resize: "none", height: "37px" }}
                    onChange={onChangeDetail}
                  />
                </Form.Group>
              </Form>
            </FormBox>
            <HastTagBox>
              <Calendar
                method={modal.method === "update" ? "update" : "post"}
                setDate={setEndDate}
                value={endDate}
                width="115px"
                name="오늘"
              />
              <Priority
                setPriority={setPriority}
                value={prioirty}
                method={modal.method === "update" ? "update" : "post"}
              />
              <Project
                setProject={setProject}
                value={project}
                method={modal.method === "update" ? "update" : "post"}
              />
            </HastTagBox>
            <SubmitButton
              onClick={modal.method === "update" ? onRewrite : onSubmit}
            >
              {modal.method === "update" ? "수정" : "추가"}
            </SubmitButton>
          </ModalView>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
