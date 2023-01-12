import { User } from "services/UserService";
import create from "zustand";

type UseAllUsers = {
  allUsers: User[];
  setAllUsers: (allUsers: User[]) => void;
};

export const useAllUsers = create<UseAllUsers>((set) => ({
  allUsers: [] as User[],
  setAllUsers: (allUsers) => {
    set(() => ({ allUsers }));
  },
}));
