import { Model } from "../Model";

export type AuthUserResponse = {
  username: string;
  email: string;
  accessToken: string;
};

export type AuthTokenResponse = {
  id: number;
  displayName: string;
  username: string;
  email: string;
  accessToken: string;
  expires_at: number;
  avatar: string;
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

  public completeProfile = () => {
    return this.customUrl("auth/complete-profile");
  };

  public authCheck = () => {
    return this.customUrl("auth/check-status");
  };

  public forgetPassword = () => {
    return this.customUrl("auth/forget-password");
  };
}
