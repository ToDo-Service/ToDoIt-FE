import type { Header } from "@/types/tb";

export const HeaderData: Header[] = [
  { id: 1, title: "오늘 할 일", Icon: "BookMarkCheck", path: "/main/today" },
  {
    id: 2,
    title: "계획된 일정",
    Icon: "CalendarEvent",
    path: "/main/nextplan",
  },
  { id: 3, title: "내 평균", Icon: "BookMarkCheck", path: "/main/ranking" },
  { id: 4, title: "프로젝트", Icon: "", path: "/main/project" },
];
