import { Register } from "hooks/useForm";
import { NextPageContext } from "next";
import { UserConversation } from "utils/extractUserFromMembers";
import { TokenService } from "./TokenService";

export interface User {
  token: string;
  username: string;
  email: string;
  uid: string;
  profileImage: string;
  friends: UserConversation[];
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

  updateUser(userId: string, updatedUser: User) {
    return fetch(`http://localhost:8080/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then(async (result) => await result.json())
      .catch((error) => error);
  },
};
