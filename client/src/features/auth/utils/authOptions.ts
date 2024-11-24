import { NEXT_AUTH_SECRET } from "@/config";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { login } from "../api/login";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your_username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your_password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        const values = {
          username: credentials?.username,
          password: credentials?.password,
        };
        const res = await login({ values });
        if (res.data) {
          return res.data as any;
        }
        throw new Error(`${res.message}`);
      },
    }),
  ],
  secret: NEXT_AUTH_SECRET,
  debug: false,
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  jwt: {
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
