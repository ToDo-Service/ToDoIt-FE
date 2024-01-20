import Sidebar from "@/templates/Sidebar";
import PageTemp from "@/templates/PageTemp";
import styled from "styled-components";

const MainLayout = styled.div`
  display: flex;
`;

export default function Home() {
  if (status === "authenticated") {
    return (
      <MainLayout>
        <Sidebar />
        <PageTemp />
      </MainLayout>
    );
  }
}
