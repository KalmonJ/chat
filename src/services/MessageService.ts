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
};
