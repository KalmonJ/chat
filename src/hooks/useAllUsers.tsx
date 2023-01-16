import { User } from "services/UserService";
import { UserCoversation } from "utils/extractUserFromMembers";
import create from "zustand";

type UseAllUsers = {
  allUsers: UserCoversation[];
  setAllUsers: (allUsers: UserCoversation[]) => void;
};

export const useAllUsers = create<UseAllUsers>((set) => ({
  allUsers: [] as UserCoversation[],
  setAllUsers: (allUsers) => {
    set(() => ({ allUsers }));
  },
}));
