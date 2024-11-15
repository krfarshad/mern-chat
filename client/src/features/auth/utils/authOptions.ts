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
        const values = {
          username: credentials?.username,
          password: credentials?.password,
        };

        const res = await login({ values });

        if (res.data) {
          return res.data as any;
        }
        return null;
      },
    }),
  ],
  secret: NEXT_AUTH_SECRET,
  debug: false,
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      return user ? true : false;
    },
    async redirect({ url, baseUrl }) {
      return url;
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
      return { ...session, user: { ...(token?.user as {}) } };
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};

async function refreshAccessToken(token: any) {
  // try {
  //   const response = await fetch(
  //     `${process.env.NEXTAUTH_URL}/api/refresh-token`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ refreshToken: token.refreshToken }),
  //     },
  //   );
  //   const refreshedTokens = await response.json();
  //   if (!response.ok) {
  //     throw refreshedTokens;
  //   }
  //   return {
  //     ...token,
  //     accessToken: refreshedTokens.accessToken,
  //     accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
  //     refreshToken: refreshedTokens?.refreshToken ?? token.refreshToken,
  //   };
  // } catch (error) {
  //   console.error("Error refreshing access token:", error);
  //   return {
  //     ...token,
  //     error: "RefreshAccessTokenError",
  //   };
  // }
}
