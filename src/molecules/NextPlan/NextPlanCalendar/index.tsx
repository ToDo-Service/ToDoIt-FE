import { useState, useEffect, useRef, use, useLayoutEffect } from "react";
import NextPlanCalendarMonth from "../NextPlanCalendarMonth";
import uuid from "react-uuid";
import { format, addMonths, startOfWeek, addDays, getDay } from "date-fns";
import { endOfWeek, isSameDay, isSameMonth } from "date-fns";
import { startOfMonth, endOfMonth } from "date-fns";
import styled from "styled-components";
import useSWR from "swr";
import Fetcher from "@/utils/fetcher";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalModal, jwtToken, NextPlanCalender } from "@/reocoil";
import FindColor from "@/utils/findColor";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useHoliday } from "@/hooks/useHoliday";
import React from "react";
import { media } from "@/styles/media";

const ScheduleCalendar = styled.div`
  width: 65.2778vw;
  height: 83.6914vh;
  max-height: 857px;
  max-width: 940px;
  margin-top: 28px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 16px;
  position: relative;

  ${media.phone`
      width:95vw;
      border: none;      
  `}
`;

const TextToday = styled.div`
  width: 95%;
  height: 7.6172vh;
  justify-content: space-between;
  max-height: 78px;
  font-size: 0.5rem;
  font-family: "Pretendard-Bold";
  font-weight: 300;
  display: flex;
  align-items: center;
  padding-left: 35px;
  padding-right: 68px;

  & p {
    font-size: 22px;
    margin-bottom: 0;
  }

  & div {
    width: 60px;
    height: 16px;
    display: flex;
    justify-content: space-between;
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
  scroll-behavior: smooth;
  display: flex;
  font-family: "PretendardVariable";
  font-weight: 250;
  width: 100%;
  max-width: 940px;
  height: 65.918vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const DateCol = styled.div`
  font-family: "PretendardVariable";
  font-weight: 250;
  color: rgba(37, 37, 48, 0.4);
  font-size: 20px;
`;

const DateRow = styled.div`
  font-family: "PretendardVariable";
  font-weight: 250;
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
  max-width: 940px;
  height: 12.8906vh;

  & hr {
    margin-bottom: 50px;
  }

  & .col {
    text-align: center;
  }

  & .disabled {
    opacity: 0.5;
  }

  & .sunday {
    color: #ff6262;
  }

  & .saturday {
    color: #7777ff;
  }
`;

const CalenderItem = styled.div`
  height: 100%;
  width: 65.2778vw;
  &:not(:first-child) {
    margin-top: 37px;
  }

  ${media.phone`
    width: 95vw;
  `}
`;

const CalenderData = styled.div<{ Bgcolor: string }>`
  font-family: "PretendardVariable";
  font-weight: 250;
  background-color: ${(props) => props.Bgcolor};
  width: max-content;
  height: 25px;
  max-width: 125px;
  font-size: 13px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 4px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  color: rgba(37, 37, 48, 0.6);
`;

const CalenderCell = styled.div`
  & span div:not(:last-child) {
    margin-bottom: 3px;
  }
  & span div:first-child {
    margin-top: 9px;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
    transition: 0.5s ease-in-out;
    border-radius: 6px;
    padding: 5px;
  }
  & .active {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
    transition: 0.5s ease-in-out;
    border-radius: 6px;
    padding: 5px;
  }

  & span {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  & .texttoday {
    display: flex;
    flex-direction: column;
    align-items: center;
    .Date {
      width: 20px;
      height: 20px;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      background-color: #862ddf;
      border-radius: 50%;
      color: white;
    }
  }
`;

const LeftArrow = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
const RightArrow = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
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
  dayjs.locale("ko");
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
  const CurrentSelectedDate = useSetRecoilState(NextPlanCalender);

  // let params = {
  //   solYear: "2020",
  //   solMonth: "03",
  //   _type: "json",
  //   ServiceKey:
  //     "kZK9+ViVCIYkl9fywmHaud4eZaQngWRTlUSD4w+i8+bdquuwVkiR+xkj9+uFqQlwkIaZaDV9+hq+gJ27SapRjA==",
  // };
  // const test = useHoliday(params);
  // console.log(test);

  const isWeekend = (date: Date) => {
    const dayOfWeek = getDay(date);
    return (dayOfWeek === 0 && "sunday") || (dayOfWeek === 6 && "saturday");
  };

  const SetSlectedDate = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedDateInfo = `${dayjs(
      e.currentTarget.getAttribute("data-date")
    ).format("YYYY-MM-DD")}`;

    CurrentSelectedDate({
      id: 0,
      date: selectedDateInfo,
    });
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isCurrentDay = isSameDay(day, selectedDate);
      const isWeekendDay = isWeekend(day);

      // const isHolidayDay = ixsHoliday(day);

      const cellClassName = `col cell ${!isCurrentMonth ? "disabled" : ""} ${
        isCurrentDay ? "texttoday Date" : ""
      } ${isCurrentMonth && isWeekendDay ? isWeekendDay : isWeekendDay} `;

      Data?.map((item: any) => {
        `${Number(item.date[2] - 0) - 1}` === formattedDate.toString() &&
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
          onClick={(e) => {
            GModal(
              CurrentModal.toggle === "null" ? true : !CurrentModal.toggle
            );
            SetSlectedDate(e);
          }}
          data-date={day}
          className={cellClassName}
          key={uuid()}
        >
          <span className={cellClassName}>
            <p className="Date" style={{ marginBottom: "4px" }}>
              {formattedDate}
            </p>

            {isSameMonth(day, monthStart) &&
              CurrentDateData.map((item: any, index: number) => {
                return index < 2 && item;
              })}
            {CurrentDateData.length > 2 && <p>...</p>}
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
  const scrollRef = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const jwt = useRecoilValue(jwtToken);
  let currentMonth = new Date(format(currentDate, "yyyy"));
  const [cureentYear, setCurrentYear] = useState(today.getFullYear());
  const months: any[] = [];
  const monthRef = useRef<HTMLDivElement>(null);
  const CalendarScrollRef = useRef<HTMLDivElement | null>(null);
  const [monthScrollPosition, setMonthScrollPosition] = useState<any>(0);

  const { data } = useSWR(
    jwt && `https://laoh.site/api/todos/year?year=${cureentYear}`,
    (uri: string) => Fetcher(uri, jwt),
    { refreshInterval: 1000 }
  );

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

  console.log(month);
  useEffect(() => {
    setMonthScrollPosition(scrollRef.current[month - 1]?.current?.offsetLeft);
    CalendarScrollRef.current?.scrollTo({
      top: 0,
      left: monthScrollPosition,
      behavior: "smooth",
    });
  }, [month, scrollRef, monthScrollPosition]);

  useLayoutEffect(() => {
    scrollRef.current = Array(months.length)
      .fill(null)
      .map(() => React.createRef<HTMLDivElement>());
  }, []);

  return (
    <ScheduleCalendar>
      <TextToday>
        <p className="text-year">{`${cureentYear}년 ${month}월`}</p>
        <div>
          <LeftArrow
            src="/Icon/Arrow/leftArrow.png"
            alt="왼쪽 화살표"
            onClick={() =>
              month == 1
                ? (setMonth(12), setCurrentYear(cureentYear - 1))
                : setMonth(month - 1)
            }
          />
          <RightArrow
            src="/Icon/Arrow/rightArrow.png"
            alt="오른쪽 화살표"
            onClick={() =>
              month == 12
                ? (setMonth(1), setCurrentYear(cureentYear + 1))
                : setMonth(month + 1)
            }
          />
        </div>
      </TextToday>
      <RenderDays />
      <CalenderList ref={CalendarScrollRef}>
        {months.map((item: any, index: number) => {
          return (
            <div ref={scrollRef.current[index]}>
              <NextPlanCalendarMonth month={item} index={index} />
            </div>
          );
        })}
      </CalenderList>
    </ScheduleCalendar>
  );
};

export default Calender;
