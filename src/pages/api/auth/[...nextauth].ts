import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export function PostAcessToken(access_token: string | unknown) {
  console.log(access_token);
  const sucess = axios
    .post("https://laoh.site/api/auth/social/kakao", null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((res) => {
      // console.log(res);
      return res.data.body.user.access_token;
    })
    .catch((err) => {
      // console.log(err);
    });

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
  ],

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
  },
});
