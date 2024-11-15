import { Model } from "../Model";

export type UserResponse = {
  id: number;
  username: string;
  avatar?: string;
};

export class User extends Model {
  public resource(): string {
    return "users";
  }

  public list = () => {
    return this.customUrl("users");
  };
}
