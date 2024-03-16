import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import axios from "axios";

let privateToken: string = "";

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
    signIn: "/main/today",
  },
  callbacks: {
    signIn: async ({ user, account, profile, credentials }: any) => {
      try {
        if (account) {
          const response = await axios.post(
            `https://laoh.site/api/auth/social/${account.provider}`,
            null,
            {
              headers: { Authorization: `Bearer ${account.access_token}` },
            }
          );

          const userData = response.data;

          privateToken = userData.body.user.access_token;

          return userData;
        }
      } catch (err) {
        throw new Error("로그인 실패");
      }
      return user;
    },
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = privateToken;
      }

      return token;
    },
    
    session: async ({ session, token }) => {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.email = token.email;
      }

      return session;
    },
  },
});
