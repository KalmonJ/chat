import create from "zustand";

type UseConversationId = {
  conversationId: string;
  setConversationId: (conversationId: string) => void;
};

export const useConversationId = create<UseConversationId>((set) => ({
  conversationId: "",
  setConversationId: (conversationId) => {
    set(() => ({ conversationId }));
  },
}));
