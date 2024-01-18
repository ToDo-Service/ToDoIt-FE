import { InferGetServerSidePropsType } from "next";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { useSearchParams } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  console.log(callbackUrl);

  console.log(session);

  const GetToken = async () => {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
  };
  GetToken(); //토큰 발급

  return (
    <>
      로그인되지 않았습니다 <br />
      <button onClick={() => signIn("kakao", { callbackUrl })}>kakao</button>
      <button onClick={() => signIn("google")}>google</button>
    </>
  );
};

export default Login;
