import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";

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
