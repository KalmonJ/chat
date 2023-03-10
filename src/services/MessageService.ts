import { Message } from "hooks/useMessages";
import { UserConversation } from "utils/extractUserFromMembers";

export interface Conversation {
  _id: string;
  members: UserConversation[];
  createdAt: Date;
  updatedAt: Date;
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

  async sendFile(file: File, conversationId: string, sender: string) {
    const data = new FormData();
    data.append("files", file);
    data.append("conversationId", conversationId);
    data.append("sender", sender);

    return fetch(`http://localhost:8080/upload-images`, {
      method: "POST",
      body: data,
    })
      .then(async (result) => {
        return await result.json();
      })
      .catch((error) => console.log(error, "erro"));
  },

  async deleteAllMessages(conversationId: string, conversation: Conversation) {
    return fetch(`http://localhost:8080/channel/update/${conversationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(conversation),
    })
      .then(async (result) => {
        return await result.json();
      })
      .catch((err) => err);
  },

  async deleteConversation(conversationId: string) {
    console.log(conversationId, "id da ");
    return fetch(`http://localhost:8080/channel/delete/${conversationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (result) => await result.json())
      .catch((err) => console.log(err, "ocorreu algum erro"));
  },
};
