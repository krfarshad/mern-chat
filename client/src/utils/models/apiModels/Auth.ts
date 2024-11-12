import { Model } from "../Model";

export type AuthUserResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export type AuthTokenResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  token_type: string;
  access_token: string;
  expires_at: number;
  avatar_image: string;
  unread_messages_count: number;
  unread_notifications_count: number;
  email_verified_at: string | null;
};

export class Auth extends Model {
  public resource(): string {
    return "auth";
  }

  public logout = () => {
    return this.customUrl("auth/logout");
  };

  public login = () => {
    return this.customUrl("auth/login");
  };

  public register = () => {
    return this.customUrl("auth/register");
  };

  public authCheck = () => {
    return this.customUrl("auth/check-status");
  };

  public forgetPassword = () => {
    return this.customUrl("auth/forget-password");
  };
}
