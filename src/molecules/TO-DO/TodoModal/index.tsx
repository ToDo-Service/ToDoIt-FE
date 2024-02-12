import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { jwtToken, kanbanListState } from "@/reocoil";
import { useCallback, useState } from "react";
import axios from "axios";

const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

const ExitBtn = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 34px;
  margin-left: 537px;
`;
const AddImage = styled.img`
  margin-left: 10px;
  margin-top: 5px;
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

const TodoModal = () => {
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const [isOpen, setIsOpen] = useState(false);
  //   const [title, onChangeTitle] = useInput("");
  //   const [content, onChangeDetail] = useInput("");
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);

  const JWT = useRecoilValue(jwtToken);

  console.log(JWT);

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();

    if (1) {
      setPostError("");
      setPostSuccess(false);
      axios
        .post(
          "https://laoh.site/api/todos",
          {
            title: "todo23",
            content: "content1",
            end_date: "2024.02.12",
            project_id: null,
            priority: "높음",
            push_status: false,
          },
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
          }
        )
        .then((res) => {
          setIsOpen(!isOpen);
          console.log("전송 완료");
          setPostSuccess(true);
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response.data);
        })
        .finally(() => {});
    }
  }, []);

  const getId: number =
    kanbanList.length > 0 ? kanbanList[kanbanList.length - 1].id + 1 : 0;

  const addTodo = useCallback(
    (e: any) => {
      setKanbanList((prev) => [
        ...prev,
        {
          id: getId,
          title: "",
          content: "",
          category: "오늘 일정",
        },
      ]);
      setIsOpen(!isOpen);
    },
    [getId, setKanbanList]
  );

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <AddImage
        src="/Icon/Add.png"
        alt="/"
        width="16px"
        height="16px"
        onClick={openModalHandler}
      />
      {isOpen ? (
        <ModalBackdrop>
          <ModalView>
            <ExitBtn
              src="/Icon/ModalExit.png"
              alt="/"
              onClick={openModalHandler}
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
                  <Form.Control type="text" placeholder="제목" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control type="text" placeholder="설명" />
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
              <div
                style={{
                  width: "115px",
                  borderRadius: "8px",
                  backgroundColor: "#F6F6F6",
                }}
              ></div>
              <div
                style={{
                  width: "110px",
                  backgroundColor: "#FFBEBE",
                  borderRadius: "8px",
                }}
              ></div>
              <div
                style={{
                  width: "168px",
                  backgroundColor: "#FFBD3E",
                  borderRadius: "8px",
                }}
              ></div>
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
    </>
  );
};

export default TodoModal;
