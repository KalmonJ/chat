import { Conversation } from "services/MessageService";
import create from "zustand";

interface UseConversations {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
}

export const useConversations = create<UseConversations>((set) => ({
  conversations: [] as Conversation[],
  setConversations: (conversations) => {
    set(() => ({ conversations }));
  },
}));
