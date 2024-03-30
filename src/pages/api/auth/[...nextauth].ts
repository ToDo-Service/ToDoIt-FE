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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30days,
    updateAge: 24 * 60 * 60, // 24hours
  },
  pages: {
    error: "/auth/error",
    signOut: "/auth/Login",
    signIn: "/main/today",
  },
  callbacks: {
    signIn: async ({ user, account }: any) => {
      // console.log("expire", account?.expires_at);
      try {
        if (account) {
          const response = await axios.post(
            `https://laoh.site/api/auth/social/${account.provider}`,
            null,
            {
              // prettier-ignore
              headers:{Authorization:`Bearer ${account.access_token}`},
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
    // 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
    // 반환된 값은 암호화되어 쿠키에 저장
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = privateToken;
      }

      return token;
    },

    //useSession을 통해 ClientSide엣서 사용 가능
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
