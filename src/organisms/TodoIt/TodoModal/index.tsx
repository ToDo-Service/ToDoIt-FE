import dynamic from "next/dynamic";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { jwtToken, Modal, UpdateData } from "@/reocoil";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";
import { mutate } from "swr";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "@/molecules/Calendar";
import Project from "@/molecules/TO-DO/Project";
import Priority from "@/molecules/TO-DO/Priority";

const animate = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
  animate: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: `transform 0.33s ease`,
  },
  exit: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
};

const ModalBackdrop = styled.div<{ ontoggle: boolean }>`
  z-index: 3;
  position: fixed;
  display: ${(props) => (props.ontoggle ? "flex" : "none")};
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
`;

const ExitBtn = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 34px;
  margin-left: 537px;
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
  font-family: "Pretendard";
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
`;

const TodoModal = (props: any) => {
  const [method, setMethod] = useState(props.method);
  const [isaddopen, setIsaddopen] = useState(false);
  const [endDate, setEndDate] = useState(dayjs().format("YYYY.MM.DD"));
  const [title, onChangeTitle, setTitle] = useInput("");
  const [detail, onChangeDetail, setDetail] = useInput("");
  const [prioirty, setPriority] = useState("높음");
  const [project, setProject] = useState({ id: null, title: "" });
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const JWT = useRecoilValue(jwtToken);
  const ref = useRef<HTMLTextAreaElement>(null);
  const modal = useRecoilValue(Modal);
  const setModal = useSetRecoilState(Modal);
  const UData = useRecoilState(UpdateData);

  const openModalHandler = () => {
    setIsaddopen(true);
  };

  const CloseModalHandler = () => {
    setIsaddopen(false);
    setModal({ toggle: false });
  };

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
      console.log(title, detail, endDate, project.id, prioirty);
      axios
        .post(
          "https://laoh.site/api/todos",
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
          }
        )
        .then(() => {
          setPostSuccess(!postSuccess);
          CloseModalHandler();
          mutate("https://laoh.site/api/todos/today");
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response);
        })
        .finally(() => {});
    },
    [title, detail, prioirty, endDate]
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

      console.log(project.id);

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
          setPostSuccess(true);
          CloseModalHandler();
          mutate("https://laoh.site/api/todos/today");
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response.data);
        })
        .finally(() => {});
    },
    [title, detail, prioirty, endDate]
  );

  useEffect(() => {
    if (modal.method === "update") {
      setTitle(UData[0].title);
      setDetail(UData[0].content);
      setEndDate(UData[0].end_date);
      setPriority(UData[0].priority);
      setProject({
        id: UData[0]?.project?.id,
        title: UData[0]?.project?.description,
      });
    }
  }, [modal]);

  useEffect(() => {
    setTitle("");
    setDetail("");
    setEndDate(dayjs().format("YYYY.MM.DD"));
    setPriority("높음");
    setProject({ id: null, title: "" });
  }, [postSuccess]);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    if (ref.current.scrollHeight <= 60) {
      ref.current.style.height = "37px";
      ref.current.style.height = ref.current.scrollHeight + "px";
    } else {
      ref.current.style.height = "60px";
    }
  }, []);

  console.log(modal.toggle);

  return (
    <AnimatePresence>
      {method === "post" && (
        <motion.div
          initial={animate.initial}
          //@ts-ignore
          animate={animate.animate}
          //@ts-ignore
          exit={animate.exit}
        >
          <AddTodo onClick={openModalHandler}>
            <span>+ 할 일을 추가해주세요</span>
          </AddTodo>
        </motion.div>
      )}
      {isaddopen ? (
        <ModalBackdrop ontoggle={true}>
          <ModalView>
            <ExitBtn
              src="/Icon/Modal/ModalExit.png"
              alt="/"
              onClick={CloseModalHandler}
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
                    style={{ resize: "none" }}
                    onChange={onChangeDetail}
                  />
                </Form.Group>
              </Form>
            </div>
            <div
              style={{
                width: "418px",
                height: "37px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Calendar
                method={modal.method === "update" ? "update" : "post"}
                setDate={setEndDate}
                width="115px"
                name="오늘"
              />
              <Priority
                setPriority={setPriority}
                method={modal.method === "update" ? "update" : "post"}
              />
              <Project
                onChange={setProject}
                value={project}
                method={modal.method === "update" ? "update" : "post"}
              />
            </div>
            <div
              onClick={modal.method === "update" ? onRewrite : onSubmit}
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
              {modal.method === "update" ? "수정" : "추가"}
            </div>
          </ModalView>
        </ModalBackdrop>
      ) : (
        <ModalBackdrop ontoggle={modal.toggle}>
          <ModalView>
            <ExitBtn
              src="/Icon/Modal/ModalExit.png"
              alt="/"
              onClick={CloseModalHandler}
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
                    style={{ resize: "none" }}
                    onChange={onChangeDetail}
                  />
                </Form.Group>
              </Form>
            </div>
            <div
              style={{
                width: "418px",
                height: "37px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Calendar
                method={modal.method === "update" ? "update" : "post"}
                setDate={setEndDate}
                width="115px"
                name="오늘"
              />
              <Priority
                setPriority={setPriority}
                method={modal.method === "update" ? "update" : "post"}
              />
              <Project
                onChange={setProject}
                value={project}
                method={modal.method === "update" ? "update" : "post"}
              />
            </div>
            <div
              onClick={modal.method === "update" ? onRewrite : onSubmit}
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
              {modal.method === "update" ? "수정" : "추가"}
            </div>
          </ModalView>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
