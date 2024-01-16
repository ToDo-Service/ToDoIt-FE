import Header from "@/organisms/Header";
import TodoList from "@/organisms/\bTodoList";
import { useState } from "react";

const PageTemp = () => {
  const [HeaderName, setHeaderName] = useState(["오늘의 할 일 "]);

  return (
    <div>
      <Header Headername={HeaderName[0]} />
      <TodoList />
    </div>
  );
};

export default PageTemp;
