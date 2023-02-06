import { Conversation, MessageService } from "services/MessageService";
import { useConversationId } from "./useConversationId";
import { create } from "zustand";

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

export const useHandleConversations = () => {
  const { conversations, setConversations } = useConversations();
  const conversationId = useConversationId((state) => state.conversationId);

  const deleteCurrentChannel = async (conversationId: string) => {
    const updatedList = conversations.filter(
      (conv) => conv._id !== conversationId
    );
    setConversations(updatedList);
    await MessageService.deleteConversation(conversationId);
  };

  const getActiveConversation = () => {
    const activeConversation = conversations.find(
      (conv) => conv._id === conversationId
    );

    return activeConversation;
  };

  return {
    deleteCurrentChannel,
    getActiveConversation,
  };
};
