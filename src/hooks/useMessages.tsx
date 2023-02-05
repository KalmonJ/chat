import create from "zustand";
import { useConversations } from "./useConversations";
import { MessageService } from "services/MessageService";
import { useSocket } from "./useSocket";
import { useUser } from "hooks/useUser";
import { extractUserFromMembers } from "utils/extractUserFromMembers";
import { useConversationId } from "./useConversationId";

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
  const { setMember, setConversationId } = useConversationId();
  const user = useUser((state) => state.user);
  const { socket } = useSocket();

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

      socket.emit("last_state_channel", {
        channelId: conversationId,
      });

      setMessages([]);

      return console.log(response, "resposta do delete all messages");
    }

    return;
  };

  const handleClickChat = async (conversationId: string) => {
    const conv = conversations.filter((conv) => conv._id === conversationId);
    if (!conv[0]?.members) {
      return;
    }
    const [member] = extractUserFromMembers(conv[0].members, user);
    setMember(member);
    const messages = await MessageService.getMessages(conversationId);
    setConversationId(conversationId);
    setMessages(messages);
  };

  return {
    deleteAllMessages,
    handleClickChat,
  };
};
