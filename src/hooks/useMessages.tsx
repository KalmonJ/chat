import create from "zustand";
import { useConversations } from "./useConversations";
import { MessageService } from "services/MessageService";

export type Message = {
  conversationId: string;
  text: string | undefined;
  sender: string;
  image: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  messageDate: Date;
  _id: string;
};

type UseMessages = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

export const useMessages = create<UseMessages>((set) => ({
  messages: [] as Message[],
  setMessages: (messages) => {
    set(() => ({ messages }));
  },
}));

export const useHandleMessages = () => {
  const conversations = useConversations((state) => state.conversations);
  const setMessages = useMessages((state) => state.setMessages);

  const deleteAllMessages = async (conversationId: string) => {
    const userConversations = [...conversations];
    const conversationFound = userConversations.find(
      (conv) => conv._id === conversationId
    );
    if (!!conversationFound) {
      conversationFound.messages = [];
      const response = await MessageService.deleteAllMessages(
        conversationId,
        conversationFound
      );

      setMessages([]);

      return console.log(response, "resposta do delete all messages");
    }

    return;
  };

  return {
    deleteAllMessages,
  };
};
