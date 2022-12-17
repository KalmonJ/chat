import { User } from "services/UserService";
import create from "zustand";

interface UseUser {
  user: User;
  setUser: (user: User) => void;
}

export const useUser = create<UseUser>((set) => ({
  user: {} as User,
  setUser: (user) => {
    set(() => ({ user }));
  },
}));
