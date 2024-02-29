import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      name: string | null | undefined;
      image: string | null | undefined;
      email: string | null | undefined;
    };
    expires: string | null | undefined;
  }
}
