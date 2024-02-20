import { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styled from "styled-components";

const CalendarContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 115px;
  height: 37px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  padding: 0px 10px;
  color: #8f8f8f;
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  /* line-height: 140%;   */
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
  const [nowDate, setNowDate] = useState(dayjs().format("MM월 DD일 (ddd)"));
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [value, onchange] = useState(new Date());

  const handleToggleCalendar = () => {
    setIsCalOpen(!isCalOpen);
  };

  const handleDateChange = (selectedDate: any) => {
    onchange(selectedDate);
    setIsCalOpen(false);
    setNowDate(dayjs(selectedDate).format("MM월 DD일 (ddd)"));
    props.setDate(dayjs(selectedDate).format("YYYY.MM.DD"));
  };

  return (
    <CalendarContainer>
      <DropdownButton onClick={handleToggleCalendar}>
        오늘 <div style={{ fontSize: "10px" }}>{nowDate}</div>
      </DropdownButton>
      <CalendarWrapper $iscalopen={isCalOpen ? 1 : 0}>
        <Calendar
          onChange={handleDateChange}
          value={value}
          formatDay={(locale, date) => dayjs(date).format("DD")}
        />
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default calendar;
