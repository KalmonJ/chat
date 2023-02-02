import { Conversation, MessageService } from "services/MessageService";
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

export const useHandleConversations = () => {
  const { conversations, setConversations } = useConversations();
  const deleteCurrentChannel = async (conversationId: string) => {
    const updatedList = conversations.filter(
      (conv) => conv._id !== conversationId
    );
    setConversations(updatedList);

    await MessageService.deleteConversation(conversationId);
  };

  return {
    deleteCurrentChannel,
  };
};
