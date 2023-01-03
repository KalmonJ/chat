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
};
