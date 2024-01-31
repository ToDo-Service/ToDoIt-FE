import Header from "@/organisms/Header";
import TodoList from "@/organisms/TodoRecent";
import TodoToday from "@/organisms/TodoToday";
import { useState } from "react";
import styled from "styled-components";

const TodoPageMainBox = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 110px;
`;

const PageTemp = () => {
  const [HeaderName, setHeaderName] = useState(["오늘의 할 일 "]);

  return (
    <div>
      <Header Headername={HeaderName[0]} />
      <TodoPageMainBox>
        <TodoList />
        <TodoToday />
      </TodoPageMainBox>
    </div>
  );
};

export default PageTemp;
