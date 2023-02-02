import { TokenService } from "services/TokenService";
import { UserConversation } from "utils/extractUserFromMembers";
import create from "zustand";

type UseAllUsers = {
  allUsers: UserConversation[];
  setAllUsers: (allUsers: UserConversation[]) => void;
};

export const useAllUsers = create<UseAllUsers>((set) => ({
  allUsers: [] as UserConversation[],
  setAllUsers: (allUsers) => {
    const user = TokenService.get(null);
    const index = allUsers.findIndex((chatUser) => chatUser._id === user.uid);
    allUsers.splice(index, 1);
    set(() => ({ allUsers }));
  },
}));
