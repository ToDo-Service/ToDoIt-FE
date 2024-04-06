import Calendar from "@/molecules/Calendar";
import ProejctAddRepeat from "@/molecules/PROJECT/ProjectAddrepeat";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, jwtToken } from "@/reocoil";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import Priority from "@/molecules/TO-DO/Priority";
import { useInput } from "@/hooks/useInput";
import dayjs from "dayjs";
import { mutate } from "swr";
import {
  ModalBackdrop,
  ModalView,
  ExitBtn,
  ProjectInputboxMainbox,
  ProjectDetailboxMainbox,
} from ".";

export const ProejectModal = (props: any) => {
  const [endDate, setEndDate] = useState(dayjs().format("YYYY.MM.DD"));
  const [prioirty, setPriority] = useState("높음");
  const [title, onChangeTitle, setTitle] = useInput("");
  const [detail, onChangeDetail, setDetail] = useInput("");
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [repeat, setRepaet] = useState<string>("월요일마다");
  const setModal = useSetRecoilState(Modal);
  const setUData = useSetRecoilState(UpdateData);

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
            end_date: endDate,
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
          setPostSuccess(!postSuccess);
          props.onclose(!props.modalstate);
        })
        .catch((err) => {
          console.log(err.response);
          setPostError(err.response);
        })
        .finally(() => {});
    },
    [title, detail, prioirty, endDate]
  );

  const RewriteModal = () => {
    setUData({
      id: Data.id,
      title: Data.title,
      content: Data.content,
      end_date: Data.end_date,
      status: Data.status,
      priority: Data.priority,
      project: Data.project,
    });
    setModal({ id: Data.id, method: "update", toggle: true });
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
            onChange={onChangeDetail}
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
            <Calendar
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
            onClick={onSubmit}
          >
            추가하기
          </div>
        </ModalView>
      </ModalBackdrop>
    </>
  );
};
