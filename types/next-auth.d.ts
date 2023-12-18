import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
  }

  interface Session {
    user: User & {
      id: string,
      email: string,
      username: string,
      created_at: string,
      updated_at: string,
      access_token: string,
      refresh_token: string
    };
    token: {
      id: string,
      email: string,
      username: string,
      created_at: string,
      updated_at: string,
      access_token: string,
      refresh_token: string
    };
  }
}
