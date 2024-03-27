import { useState, useEffect, useRef } from "react";
import NextPlanCalendarMonth from "../NextPlanCalendarMonth";
import uuid from "react-uuid";
import { format, addMonths, startOfWeek, addDays } from "date-fns";
import { endOfWeek, isSameDay, isSameMonth } from "date-fns";
import { startOfMonth, endOfMonth } from "date-fns";
import styled from "styled-components";
import useSWR from "swr";
import Fetcher from "@/utils/fetcher";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalModal, jwtToken } from "@/reocoil";

import FindColor from "@/utils/findColor";

const ScheduleCalendar = styled.div`
  width: 65.2778vw;
  height: 83.6914vh;
  max-height: 857px;
  max-width: 940px;
  margin-top: 28px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 16px;
  font-family: "Pretendard";
  position: relative;
`;

const TextToday = styled.div`
  width: 100%;
  height: fit-content;
  font-size: 0.5rem;
  & p {
    font-size: 22px;
    margin-top: 30px;
    margin-left: 35px;
  }
`;

const CalenderList = styled.div`
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  height: 65.918vh;
  overflow-y: scroll;
  overflow-x: hidden;
  & > div:not(:first-child) {
    margin-top: 200px;
  }
`;

const DateCol = styled.div`
  color: rgba(37, 37, 48, 0.4);
  font-size: 20px;
`;

const DateRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const CalenderBody = styled.div`
  height: 58.7891vh;
  width: 100%;
  margin-top: 15px;
`;

const CalenderBodyRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 12.8906vh;

  & hr {
    margin-bottom: 50px;
  }

  & .col {
    text-align: center;
  }

  & .disabled {
    color: rgba(37, 37, 48, 0.4);
  }
`;

const CalenderItem = styled.div`
  height: 100%;
  &:not(:first-child) {
    margin-top: 37px;
  }
`;

const CalenderData = styled.div<{ Bgcolor: string }>`
  background-color: ${(props) => props.Bgcolor};
  width: 95%;
  height: 25px;
  border-radius: 4px;
  border: 1px solid rgba(12, 0, 24, 0.1);
`;

const CalenderCell = styled.div`
  & span div:not(:last-child) {
    margin-bottom: 3px;
  }
  & span div:first-child {
    margin-top: 9px;
  }
  & span {
    margin-bottom: 10px;
  }

  & .texttoday {
    display: flex;
    flex-direction: column;
    align-items: center;
    .Date {
      width: 25px;
      height: 25px;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      background-color: #c01ac0;
      border-radius: 50%;
      color: white;
    }
  }
`;

const RenderHeader = ({ currentMonth }: any) => {
  return <div className="header row"></div>;
};

const RenderDays = () => {
  const days: any[] = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];
  for (let i = 0; i < 7; i++) {
    days.push(<DateCol>{date[i]}</DateCol>);
  }
  return <DateRow>{days}</DateRow>;
};

const RenderCells = ({ currentMonth, selectedDate, Data }: any) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  let CurrentDateData: any = [];
  const rows: any[] = [];
  let days: any[] = [];
  let day = startDate;
  let formattedDate = "";
  const CurrentModal = useRecoilValue(GlobalModal);
  const GModal = useSetRecoilState(GlobalModal);

  const PopProejct = () => {
    GModal(!CurrentModal);
    console.log(CurrentModal);
  };

  const SetSlectedDate = (id: number, date: string) => {};

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      Data?.map((item: any) => {
        `${item.date[2] - 0}` === formattedDate.toString() &&
          CurrentDateData.push(
            <CalenderData
              Bgcolor={
                item.color
                  ? item.color[0]?.backgroundColor
                  : "rgba(251, 213, 128, 0.15)"
              }
            >
              {item.title}
            </CalenderData>
          );
      });

      formattedDate = format(day, "d");
      days.push(
        <CalenderCell
          onClick={() => {
            PopProejct();
            SetSlectedDate(1, formattedDate);
          }}
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : "not-valid"
          }`}
          key={uuid()}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : isSameMonth(day, monthStart) && isSameDay(day, selectedDate)
                ? "texttoday"
                : ""
            }
          >
            <p className="Date">{formattedDate}</p>
            {isSameMonth(day, monthStart) &&
              CurrentDateData.map((item: any, index: number) => {
                return index <= 2 && item;
              })}
            {/* {CurrentDateData.length > 2 && <p>...</p>} */}
          </span>
        </CalenderCell>
      );
      CurrentDateData = [];

      day = addDays(day, 1);
    }
    rows.push(<CalenderBodyRow key={uuid()}>{days}</CalenderBodyRow>);
    days = [];
  }

  return <CalenderBody>{rows}</CalenderBody>;
};

const Calender = () => {
  const currentDate = new Date();
  const selectedDate = new Date();
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const jwt = useRecoilValue(jwtToken);
  let currentMonth = new Date(format(currentDate, "yyyy"));
  const cureentYear = today.getFullYear();
  const months: any[] = [];
  const monthRef = useRef<HTMLDivElement>(null);
  const { data, error } = useSWR(
    () =>
      jwt &&
      `https://laoh.site/api/todos/month?year=${cureentYear}&month=${month}`,
    (uri: string) => Fetcher(uri, jwt)
  );
  if (error) return <div>캘린더 데이터 패칭 에러입니다.</div>;

  const MonthData = data?.body.map((item: any, index: any) => {
    return {
      date: item.end_date.split("-"),
      id: item.id,
      title: item.title,
      color: FindColor(item.project?.color),
    };
  });

  for (let i = 0; i < 12; i++) {
    const CurrentMonthData = MonthData?.filter((item: any) => {
      return `${item.date[1]}` === `0${i + 1}`;
    });

    months.push(
      <CalenderItem
        key={uuid()}
        ref={
          format(currentMonth, "MM") === format(selectedDate, "MM")
            ? monthRef
            : null
        }
      >
        <RenderHeader currentMonth={currentMonth} />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          Data={CurrentMonthData}
        />
      </CalenderItem>
    );
    currentMonth = addMonths(currentMonth, 1);
  }

  useEffect(() => {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  // 스크롤 감지

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const position = scrollRef.current.scrollTop;
        setMonth(Number((position / 772).toFixed(0)) + 1);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <ScheduleCalendar>
      <TextToday>
        <p className="text-year">{`${format(
          currentDate,
          "yyyy"
        )}년 ${month}월`}</p>
      </TextToday>
      <RenderDays />
      <CalenderList ref={scrollRef}>
        {months.map((item: any, index: number) => {
          return (
            <div>
              {/* {index !== 0 && <hr />} */}
              <NextPlanCalendarMonth month={item} index={index} />
            </div>
          );
        })}
      </CalenderList>
    </ScheduleCalendar>
  );
};

export default Calender;
