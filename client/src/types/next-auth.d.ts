import { AuthTokenResponse, AuthUserResponse } from "@/utils/models";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] & AuthTokenResponse;
    error?: unknown;
  }

  interface User extends AuthTokenResponse {
    user: AuthUserResponse;
  }

  interface Jwt extends AuthTokenResponse {}
}
