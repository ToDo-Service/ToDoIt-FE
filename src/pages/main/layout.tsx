import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";
import Header from "@/organisms/Header";
import styled from "styled-components";
import { FunctionComponent, Suspense } from "react";
import type { LayoutProps } from "@/types/tb";
import { HeaderData } from "@/data/Headet";
import { SWRConfig } from "swr";
import { LoadingSpinner } from "@/atoms/LoadingSpinner";
import { media } from "@/styles/media";

const LayouyMainbox = styled.section`
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  position: relative;
`;

const LayouyHeader = styled.header`
  display: flex;
  height: 110px;
  z-index: 99;
  border-bottom: solid 0.02px #c8c5cb;
  ${media.phone`
     height:80px;     
  `}
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
              <Header key={item.id} title={item.title} />
            )
          );
        })}
      </LayouyHeader>
      <SWRConfig value={{ suspense: true }}>
        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      </SWRConfig>
    </LayouyMainbox>
  );
};

export default MainLayout;
