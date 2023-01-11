import { Register } from "hooks/useForm";
import { NextPageContext } from "next";
import { TokenService } from "./TokenService";

export interface User {
  token: string;
  username: string;
  email: string;
  uid: string;
  profileImage: string;
}

export const UserService = {
  register(credentials: Register) {},
  get(ctx: NextPageContext) {
    const userFromCookies = TokenService.get(ctx);
    return userFromCookies;
  },
};
