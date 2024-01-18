import Sidebar from "@/templates/Sidebar";
import PageTemp from "@/templates/PageTemp";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const MainLayout = styled.div`
  display: flex;
`;

export default function Home() {
  const { data: session, status } = useSession();
  console.log(status);

  if (status === "authenticated") {
    return (
      <MainLayout>
        <Sidebar />
        <PageTemp />
      </MainLayout>
    );
  }
}
