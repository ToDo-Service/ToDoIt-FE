import styled from "styled-components";
import Link from "next/link";
import { LoadingSpinner } from "@/atoms/LoadingSpinner";

const MainLayout = styled.div`
  display: flex;
`;

export default function Home() {
  return (
    <div>
      <Link href={"/auth/Login"}>로그인하러가기</Link>
    </div>
  );
}
