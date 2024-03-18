import { useState, useEffect } from "react";

const NextPlanCalendar = () => {
  const [calender, setCalender] = useState<string>("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  // 윤달 체크하기
  const checkLeapYear = (year: number) => {
    if (year % 400 === 0) return true;
    else if (year % 100 === 0) return false;
    else if (year % 4 === 0) return true;
    else return false;
  };

  // 각 달의 01일 위치 정해주기
  const getFirstDayOfWeek = (year: number, month: number) => {
    let zero = "";
    if (month < 10) zero = "0";
    return new Date(year + "-" + zero + month + "-" + "01").getDay();
  };

  const changeYearMonth = (year: number, month: number) => {
    let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //윤달이면 29일
    if (month === 2) if (checkLeapYear(year)) monthDay[1] = 29;

    //01일 위치
    let firstDay = getFirstDayOfWeek(year, month);

    //이전 달 날짜
    let lasyDay = monthDay[month - 1];
    let arrCalender = [];

    // 01일이 생성되기 전 비어있는 내용
    for (let i = 0; i < firstDay; i++) {
      arrCalender.push("");
    }

    //날짜 넣어주기

    for (let i = 1; i <= monthDay[month - 1]; i++) {
      arrCalender.push(String(i));
    }

    //마지막 날짜까지 넣고 비어있는 내용
    let remainDay = 7 - (arrCalender.length % 7);

    if (remainDay < 7) {
      for (let i = 0; i < remainDay; i++) {
        arrCalender.push("");
      }
    }

    renderCalender(arrCalender);
  };
  //캘린더 렌더링

  const renderCalender = (calender: string[]) => {
    let contents = [];
    for (let i = 0; i < calender.length; i++) {
      if (i === 0) contents.push("<tr>");
      else if (i % 7 === 0) {
        contents.push("</tr>");
        contents.push("<tr>");
      }
      contents.push(
        <td>
          <div className="table_hover">
            <span>{calender[i]}</span>
            {/* {calender[]} */}
          </div>
        </td>
      );
    }

    contents.push("</tr>");
    setCalender(contents.join(""));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <div>월</div>
        <div>
          요일
          {calender.length > 0 && (
            <div dangerouslySetInnerHTML={{ __html: calender }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextPlanCalendar;
