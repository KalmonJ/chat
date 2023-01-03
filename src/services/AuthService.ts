import { Login } from "hooks/useForm";
import { TokenService } from "./TokenService";

export const AuthService = {
  async login(credentials: Login) {
    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (result) => {
        const user = await result.json();

        if (!result.ok) {
          throw new Error(user.error);
        }

        TokenService.save(null, user);
        return user;
      })
      .catch((error) => {
        return {
          error,
        };
      });
  },
};
