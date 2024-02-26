import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Calendar from "@/molecules/Calendar";
import Project from "@/molecules/TO-DO/Project";
import { useRecoilState, useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import { useCallback, useState } from "react";
import axios from "axios";
import Priority from "@/molecules/TO-DO/Priority";
import { useRef } from "react";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";
import { mutate } from "swr";

const ModalBackdrop = styled.div`
  position: fixed;
  /* position: fixed;
  display: flex; */
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* filter: drop-shadow(3px 3px rgba(12, 0, 24, 0.1)); */
  border-radius: 10px;
  top: 0;
  left: -400px;
  right: 0;
  bottom: 0;
`;

const ExitBtn = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 34px;
  margin-left: 300px;
`;

const ModalView = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  height: 350px;
  width: 376px;
  background-color: #ffffff;
`;

const RewriteModal = (props: any) => {
  const [isaddopen, setIsaddopen] = useState(props.status);
  const [endDate, setEndDate] = useState(dayjs().format("YYYY.MM.DD"));
  const [title, onChangeTitle] = useInput("");
  const [detail, onChangeDetail] = useInput("");
  const [prioirty, setPriority] = useState("높음");
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const JWT = useRecoilValue(jwtToken);
  const ref = useRef<HTMLTextAreaElement>(null);

  const CloseModalHandler = () => {
    setIsaddopen(!isaddopen);
  };

  const onSubmit = useCallback(
    (e: any) => {
      //서버 전송
      mutate("https://laoh.site/api/todos/today");
      e.preventDefault();
      setPostError("");
      setPostSuccess(false);
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
    <>
      {isaddopen ? (
        <ModalBackdrop>
          <ModalView>
            <ExitBtn
              src="/Icon/ModalExit.png"
              alt="/"
              onClick={CloseModalHandler}
            />
            <div style={{ width: "300px" }}>
              <div style={{ textAlign: "center" }}>
                <h1
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: "32px",
                    marginBottom: "15px",
                  }}
                >
                  일정수정
                </h1>
              </div>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="제목"
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
                    onInput={handleResizeHeight}
                    style={{ resize: "none" }}
                    onChange={onChangeDetail}
                  />
                </Form.Group>
              </Form>
            </div>
            <div
              style={{
                width: "320px",
                height: "37px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Calendar setDate={setEndDate} />
              <Priority setPriority={setPriority} />
              <Project />
            </div>
            <div
              onClick={onSubmit}
              style={{
                width: "320px",
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
    </>
  );
};

export default RewriteModal;
