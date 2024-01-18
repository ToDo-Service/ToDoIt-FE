import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  console.log(session);

  const GetToken = async () => {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
  };

  GetToken();

  if (session) {
    return (
      <>
        {session.user?.name}님 반갑습니다 <br />
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <>
      로그인되지 않았습니다 <br />
      <button onClick={() => signIn("kakao")}>Sign in</button>
    </>
  );
};

export default Login;
