import { BASE_API_URL, NEXT_AUTH_SECRET } from "@/config";
import { fetch } from "@/utils/models/";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

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
        const res = await fetch(`${BASE_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
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
    async signIn({ user, account, profile, email, credentials }) {
      return user ? true : false;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }

      if (user) {
        token.user = {
          ...user,
          ...(account?.access_token
            ? { access_token: account.access_token }
            : {}),
          ...(account?.email_verified_at
            ? { email_verified_at: account.email_verified_at }
            : {}),
          ...(account?.token_type ? { token_type: account.token_type } : {}),
          ...(account?.expires_at ? { expires_at: account.expires_at } : {}),
        };
      }

      if (Date.now() < session.accessTokenExpires) {
        return token;
      }

      // If access token expired, refresh it
      return refreshAccessToken(session);
    },
    async session({ session, token }) {
      return { ...session, user: { ...(token?.user as {}) } };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      },
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
