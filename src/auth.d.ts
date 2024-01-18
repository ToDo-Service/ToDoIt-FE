import NextAuth, { DefaultSession, User } from "next-auth/next";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: String;
    } & DefaultSession["user"];
    accessToken: string;
  }
}
