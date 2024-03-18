import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";
import Header from "@/organisms/Header";

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

  console.log(router.asPath);

  return (
    <section>
      {router.asPath === "/" || router.asPath === "/auth/Login" ? undefined : (
        <Sidebar />
      )}
      {HeaderData.map((item: any) => {
        return item.path === router.asPath ? (
          <Header icon={item.Icon} title={item.title} />
        ) : (
          ""
        );
      })}

      {children}
    </section>
  );
}
