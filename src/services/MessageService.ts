import { UserCoversation } from "utils/extractUserFromMembers";

export interface Message {
  conversationId: string;
  sender: string;
  text: string;
}

export interface Conversation {
  _id: string;
  members: UserCoversation[];
  createdAt: string;
  messages: Message[];
}

export const MessageService = {
  async getConversations(userId: string) {
    return fetch(`http://localhost:8080/${userId}`)
      .then(async (result) => {
        const conversations = await result.json();
        return conversations;
      })
      .catch((error) => {
        return error;
      });
  },

  async getMessages(conversationId: string) {
    return fetch(`http://localhost:8080/messages/${conversationId}`)
      .then(async (result) => {
        const apiResponse = await result.json();
        return apiResponse;
      })
      .catch((error) => {
        return error;
      });
  },

  async createConversation(receiverId: string, senderId: string) {
    console.log(receiverId, senderId, "payload");
    return fetch(`http://localhost:8080/create/channel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverId, senderId }),
    })
      .then(async (result) => {
        const apiResponse = await result.json();
        return apiResponse;
      })
      .catch((error) => error);
  },
};
