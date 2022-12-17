import { ChangeEvent, FormEvent, useState } from "react";
import { AuthService } from "services/AuthService";
import { User } from "services/UserService";
import { useRouter } from "next/router";
import { useUser } from "./useUser";

export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  username: string;
}

export const useForm = <S extends Login | Register>(initialState: S) => {
  const { setUser } = useUser();
  const [state, setState] = useState<S>(initialState);
  const [error, setError] = useState("");
  const route = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ("username" in initialState) {
      console.log("register");
    }

    const response: User = await AuthService.login(state);
    const hasError = verifyErrors(response);

    if (!hasError) {
      setUser(response);
      return route.push("/chat");
    }
  };

  const verifyErrors = (response: any) => {
    if ("error" in response) {
      setError(response.error.message);
      return true;
    }

    return false;
  };

  return {
    state,
    handleChange,
    handleSubmit,
    error,
  };
};
