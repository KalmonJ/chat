import create from "zustand";

export type Message = {
  conversationId: string;
  text: string;
  sender: string;
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
