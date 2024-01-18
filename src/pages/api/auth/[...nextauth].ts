import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";
import { useQuery, gql } from "@apollo/client";

interface User_s {
  accessToken: String;
  accessTokenExpires: String;
  refreshToken: String;
  user: object;
}

const GET_USER = gql`
  query User {
    user {
      access_token
      accessTokenExpires
      refresh_token
      user
    }
  }
`;

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  //호출 되었을 때 어디를 보여줄지 결정
  callbacks: {
    /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     */

    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }

      //   const nowTime = Math.round(Date.now() / 1000);
      //   const shouldRefreshTime =
      //     (token.accessTokenExpires as number) - 10 * 60 - nowTime;

      //   if (shouldRefreshTime > 0) {
      //     return token;
      //   }

      return token;
      //   return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user as User;
      session.user.token = token.token;

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  //데이터 넘겨주고 싶으면 jwt토근 , 토큰에 데이터 유지하고 싶으면 session
});
