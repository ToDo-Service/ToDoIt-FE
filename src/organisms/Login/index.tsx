import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return undefined;
  }

  return (
    <>
      <button
        onClick={() =>
          signIn("kakao", { redirect: true, callbackUrl: "/main" })
        }
      >
        kakao
      </button>
      <br />
      <button
        onClick={() =>
          signIn("google", { redirect: true, callbackUrl: "/main" })
        }
      >
        google
      </button>
    </>
  );
};

export default Login;
