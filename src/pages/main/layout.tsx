import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";
import Header from "@/organisms/Header";
import styled from "styled-components";
import { FunctionComponent } from "react";
import type { LayoutProps } from "@/types/tb";
import { HeaderData } from "@/data/Headet";

const LayouyMainbox = styled.section`
  display: flex;
  width: 100vw;
  height: 100vh;

  z-index: 99;
  position: relative;
`;

const LayouyHeader = styled.header`
  display: flex;
  width: 100%;
  height: 110px;
  z-index: 99;
  border-bottom: solid 0.02px #c8c5cb;
`;

const MainLayout: FunctionComponent<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <LayouyMainbox>
      <LayouyHeader>
        <Sidebar />
        {HeaderData.map((item) => {
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
};

export default MainLayout;
