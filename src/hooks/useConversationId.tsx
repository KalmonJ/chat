import create from "zustand";
import { UserConversation } from "utils/extractUserFromMembers";

type UseConversationId = {
  conversationId: string;
  member: UserConversation;
  setConversationId: (conversationId: string) => void;
  setMember: (member: UserConversation) => void;
};

export const useConversationId = create<UseConversationId>((set) => ({
  conversationId: "",
  setConversationId: (conversationId) => {
    set(() => ({ conversationId }));
  },
  member: {} as UserConversation,
  setMember: (member) => {
    set(() => ({ member }));
  },
}));
