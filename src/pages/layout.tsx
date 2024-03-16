import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { jwtToken } from "@/reocoil";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <section>
      {router.asPath === "/" || router.asPath === "/auth/Login" ? undefined : (
        <Sidebar />
      )}
      {children}
    </section>
  );
}
