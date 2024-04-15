import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

const CalendarContainer = styled.div`
  position: relative;

  .react-calendar {
    width: 243px;
    height: 256px;
    background: white;
    border: 1px solid rgba(12, 0, 24, 0.1);
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 8px;
    line-height: 1.125em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    height: 181px;
    width: 100%;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    margin: 0.5em;
    height: 181px;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 18px;
    margin-bottom: 14px;
    color: black;
    margin-top: 21px;
    font-size: 12px;
  }
  .react-calendar__navigation button {
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__navigation__label__labelText--from {
    font-size: 12px;
    color: #252530;
  }

  .react-calendar__month-view {
    height: 181px;
  }

  .react-calendar__month-view > div {
    height: 181px;
  }

  .react-calendar__navigation__prev2-button {
    display: none;
  }

  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__month-view__days {
    height: 152px;
  }
  .react-calendar__month-view__weekdays {
    height: 17px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 10px;
    color: rgba(37, 37, 48, 0.4);
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #252530;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    width: 28px;
    height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    text-align: center;
    font: inherit;
    font-size: 10px;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }

  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    /* background-color: #e6e6e6; */
  }

  .react-calendar__tile--hasActive {
    background: #76baff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }

  .react-calendar__tile--active {
    color: #862ddf;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    color: #862ddf;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;

const DropdownButton = styled.button<{ width: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => `${props.width}`};
  height: 37px;
  border: 0.8px solid rgba(12, 0, 24, 0.1);
  border-radius: 10px;
  padding: 0px 10px;
  color: #8f8f8f;
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  appearance: none;
  background-color: #f6f6f6;
  background-position: right 12px center;
  background-size: 12px;
`;

const CalendarWrapper = styled("div")<{ $iscalopen: number }>`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.$iscalopen ? "block" : "none")};
`;

const calendar = (props: any) => {
  dayjs.locale("ko"); // 한국어 세팅
  const [isCalOpen, setIsCalOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsCalOpen(!isCalOpen);
  };

  const handleDateChange = (selectedDate: any) => {
    props.setDate(dayjs(selectedDate).format("YYYY.MM.DD"));
    setIsCalOpen(false);
  };

  return (
    <CalendarContainer>
      <DropdownButton onClick={handleToggleCalendar} width={props.width}>
        {props.name}
        <div style={{ fontSize: "10px" }}>
          {dayjs(props.value).format("MM월 DD일 (ddd)")}
        </div>
      </DropdownButton>
      <CalendarWrapper $iscalopen={isCalOpen ? 1 : 0}>
        <Calendar
          onChange={() => setIsCalOpen(false)}
          value={props.value}
          onClickDay={props.setDate}
          minDate={new Date()}
          formatDay={(locale, date: any) => dayjs(date).format("DD")}
        />
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default calendar;
