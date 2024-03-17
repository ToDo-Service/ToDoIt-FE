import styled from "styled-components";
import Calendar from "@/molecules/Calendar";

import { useRecoilState, useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ColorSelect from "@/molecules/PROJECT/ProjectModal/Color";
import { useRef } from "react";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";
import { mutate } from "swr";
import Category from "@/molecules/PROJECT/ProjectModal/Category";

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

const ProjectInputboxMainbox = styled.input`
  width: 269px;
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
const ProjectCateogry = styled.div`
  position: relative;
  cursor: pointer;
  width: 269px;
  height: 37px;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 15.8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(12, 0, 24, 0.1);
  margin-top: 11px;

  & div {
    color: #8f8f8f;
  }

  & img {
    width: 9.25px;
    height: 5.25px;
  }
`;

const ExitBtn = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 34px;
  margin-left: 370px;
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
  width: 454px;
  background-color: #ffffff;
`;

const ProejectModal = (props: any) => {
  const [endDate, setEndDate] = useState(dayjs().format("YYYY.MM.DD"));
  const [color, setColor] = useState<string>("#EA98AE");
  const [title, onChangeTitle, setTitle] = useInput("");
  const [category, setCategory] = useState<string>("카테고리");
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState(false);

  const JWT = useRecoilValue(jwtToken);

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
      axios
        .post(
          "https://laoh.site/api/project",
          {
            title: title,
            color: color,
            description: "일단 보류",
            end_date: endDate,
            category: category,
          },
          {
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
          }
        )
        .then(() => {
          setPostSuccess(!postSuccess);
          mutate("https://laoh.site/api/project");
          props.onclose();
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response);
        })
        .finally(() => {});
    },
    [title, color, endDate]
  );

  useEffect(() => {
    setTitle("");
    setCategory("카테고리");
    setColor("#EA98AE");
    setEndDate(dayjs().format("YYYY.MM.DD"));
  }, [postSuccess]);

  const PopupCategory = () => {
    setCategoryPopup(!categoryPopup);
  };

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
                프로젝트 추가
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
          <ProjectInputboxMainbox placeholder="이름" onChange={onChangeTitle} />
          <ProjectCateogry onClick={PopupCategory}>
            <div>{category}</div>
            <img src="/Icon/Project/Stroke.png" alt="/" />
            {categoryPopup ? <Category setCategory={setCategory} /> : undefined}
          </ProjectCateogry>
          <div
            style={{
              width: "269px",
              marginTop: "11px",
              height: "37px",
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Calendar setDate={setEndDate} width="128px" name="종료일" />
            <ColorSelect onChangeColor={setColor} />
          </div>
          <div
            onClick={onSubmit}
            style={{
              width: "269px",
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
