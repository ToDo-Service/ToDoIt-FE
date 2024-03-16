import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Calendar from "@/molecules/Calendar";
import Project from "@/molecules/TO-DO/Project";
import { useRecoilState, useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Priority from "@/molecules/TO-DO/Priority";
import { useRef } from "react";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";
import { mutate } from "swr";
import { motion, AnimatePresence } from "framer-motion";

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

const ModalBackdrop = styled.div`
  z-index: 3;
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
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const JWT = useRecoilValue(jwtToken);
  const ref = useRef<HTMLTextAreaElement>(null);

  const openModalHandler = () => {
    setIsaddopen(true);
  };

  const CloseModalHandler = () => {
    setIsaddopen(false);
  };

  const onSubmit = useCallback(
    (e: any) => {
      //서버 전송
      e.preventDefault();
      setPostError("");
      axios
        .post(
          "https://laoh.site/api/todos",
          {
            title: title,
            content: detail,
            end_date: endDate,
            project_id: null,
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

  useEffect(() => {
    setTitle("");
    setDetail("");
    setEndDate(dayjs().format("YYYY.MM.DD"));
    setPriority("높음");
  }, [postSuccess]);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = "37px";
    if (ref.current.scrollHeight <= 60) {
      ref.current.style.height = ref.current.scrollHeight + "px";
    } else {
      ref.current.style.height = "60px";
    }
  }, []);

  return (
    <AnimatePresence>
      {method === "post" ? (
        <motion.div
          initial={animate.initial}
          //@ts-ignore
          animate={animate.animate}
          //@ts-ignore
          exit={animate.exit}
        >
          <AddImage onClick={openModalHandler}>
            <span>+ 할 일을 추가해주세요</span>
          </AddImage>
        </motion.div>
      ) : null}

      {isaddopen || props.status ? (
        <ModalBackdrop>
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
                  일정추가
                </h1>
                <div
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: "14px",
                    marginBottom: "46px",
                  }}
                >
                  새로 할 일을 추가해주세요!
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
              <Calendar setDate={setEndDate} width="115px" name="오늘" />
              <Priority setPriority={setPriority} />
              <Project />
            </div>
            <div
              onClick={onSubmit}
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
              추가
            </div>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </AnimatePresence>
  );
};

export default TodoModal;
