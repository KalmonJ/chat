import create from "zustand";

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
