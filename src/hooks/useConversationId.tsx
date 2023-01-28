import create from "zustand";
import { UserCoversation } from "utils/extractUserFromMembers";

type UseConversationId = {
  conversationId: string;
  member: UserCoversation;
  setConversationId: (conversationId: string) => void;
  setMember: (member: UserCoversation) => void;
};

export const useConversationId = create<UseConversationId>((set) => ({
  conversationId: "",
  setConversationId: (conversationId) => {
    set(() => ({ conversationId }));
  },
  member: {} as UserCoversation,
  setMember: (member) => {
    set(() => ({ member }));
  },
}));
