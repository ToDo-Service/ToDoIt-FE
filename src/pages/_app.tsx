import "@/styles/globals.css";
import "../styles/fontstyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";

const WrapStyled = styled.div`
  position: fixed;
  padding: 0;
`;

const animate = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
  animate: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: `transform 0.33s ease`,
  },
  exit: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <>
      <RecoilRoot>
        <SessionProvider session={session}>
          <WrapStyled>
            <AnimatePresence>
              <motion.div
                key={router.route}
                initial={animate.initial}
                //@ts-ignore
                animate={animate.animate}
                //@ts-ignore
                exit={animate.exit}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </WrapStyled>
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}
