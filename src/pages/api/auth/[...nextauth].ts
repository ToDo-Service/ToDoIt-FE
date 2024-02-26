import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import axios from "axios";

export function PostAcessToken(access_token: string | unknown) {
  const sucess = axios
    .post("https://laoh.site/api/auth/social/kakao", null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((res) => {
      return res.data.body.user.access_token;
    })
    .catch((err) => {});

  return sucess;
}

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    error: "/auth/error",
    signOut: "/auth/Login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      const Jtoken = token ? await PostAcessToken(token.accessToken) : null;
      if (Jtoken) {
        session.user.accessToken = Jtoken;
      }

      return session;
    },

    jwt: async ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return `${baseUrl}`;
      }
      return baseUrl;
    },
  },
});
