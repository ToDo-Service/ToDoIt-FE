import ToDoItLayout from "@/templates/ToDoItLayout";
import ProjectPageLayout from "@/templates/ProjectPageLayout";
import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  console.log(router.asPath);

  return (
    <>
      <Sidebar />
      {router.asPath === "/main/today" ? <ToDoItLayout /> : undefined}
      {router.asPath === "/main/project" ? <ProjectPageLayout /> : undefined}
    </>
  );
}
