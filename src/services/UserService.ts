import { Register } from "hooks/useForm";
import { NextPageContext } from "next";
import { UserCoversation } from "utils/extractUserFromMembers";
import { TokenService } from "./TokenService";

export interface User {
  token: string;
  username: string;
  email: string;
  uid: string;
  profileImage: string;
  friends: UserCoversation[];
}

export const UserService = {
  register(credentials: Register) {},
  get(ctx: NextPageContext) {
    const userFromCookies = TokenService.get(ctx);
    return userFromCookies;
  },

  getAllUsers() {
    return fetch("http://localhost:8080/users")
      .then(async (result) => await result.json())
      .catch((error) => error);
  },
};
