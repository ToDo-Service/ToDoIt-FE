import { useRouter } from "next/router";
import ProjectDetailLayout from "@/templates/ProjectDetailLayout";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <ProjectDetailLayout />
    </>
  );
}
