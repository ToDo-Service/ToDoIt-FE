import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";
import Header from "@/organisms/Header";
import styled from "styled-components";

const LayouyMainbox = styled.section`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const LayouyHeader = styled.header`
  display: flex;
  width: 100%;
  height: 110px;
  border-bottom: solid 0.02px #c8c5cb;
`;

const HeaderData = [
  { id: 1, title: "오늘 할 일", Icon: "BookMarkCheck", path: "/main/today" },
  {
    id: 2,
    title: "계획된 일정",
    Icon: "CalendarEvent",
    path: "/main/nextplan",
  },
  { id: 3, title: "내 평균", Icon: "BookMarkCheck" },
  { id: 4, title: "프로젝트", Icon: "", path: "/main/project" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <LayouyMainbox>
      <LayouyHeader>
        <Sidebar />
        {HeaderData.map((item: any) => {
          return (
            router.asPath.includes(item.path) && (
              <Header key={item.id} icon={item.Icon} title={item.title} />
            )
          );
        })}
      </LayouyHeader>
      {children}
    </LayouyMainbox>
  );
}
