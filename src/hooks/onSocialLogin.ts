import { signIn } from "next-auth/react";

export const onSocialLogin = (event: any, provider: string) => {
  event.preventDefault();

  signIn(provider, {
    redirect: true,
    callbackUrl: "/",
  });
};
