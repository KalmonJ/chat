import { Register } from "hooks/useForm";
import { NextPageContext } from "next";
import { TokenService } from "./TokenService";

export interface User {
  token: string;
  username: string;
  email: string;
  uid: string;
  profileImage: string;
  friends: User[];
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
