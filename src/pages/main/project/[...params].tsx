import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";
import ProjectDetailLayout from "@/templates/ProjectDetailLayout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <ProjectDetailLayout />
    </>
  );
}
