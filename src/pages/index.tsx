import Sidebar from "@/templates/Sidebar";
import PageTemp from "@/templates/PageTemp";
import styled from "styled-components";

const MainLayout = styled.div`
  display: flex;
`;

export default function Home() {
  return (
    <MainLayout>
      <Sidebar />
      <PageTemp />
    </MainLayout>
  );
}
