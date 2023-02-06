import { useUser } from "./useUser";
import { TokenService } from "services/TokenService";
import { User } from "services/UserService";
import { useSocket } from "./useSocket";
import {
  extractUserFromMembers,
  UserConversation,
} from "utils/extractUserFromMembers";
import { isMyFriend } from "utils/isMyFriend";
import { useConversations } from "./useConversations";
import { Conversation, MessageService } from "services/MessageService";
import { useConversationId } from "./useConversationId";
import { useHandleMessages } from "./useMessages";

export const useHandleFriendList = () => {
  const { setUser, user } = useUser();
  const { socket } = useSocket();
  const {
    conversations: updatedConversation,
    setConversations: setUpdatedConversation,
  } = useConversations();

  const { setMember } = useConversationId();
  const { handleClickChat } = useHandleMessages();

  const friendList = [...user?.friends];
  const currentUser = { ...user };

  const deleteFriend = (friendId: string) => {
    const newFriendList = friendList.filter(
      (friend) => friend._id !== friendId
    );

    currentUser["friends"] = newFriendList;
    setUser(currentUser);
    TokenService.save(null, currentUser);
    updateUser(currentUser);
  };

  const updateUser = (currentUser: User) => {
    socket.emit("update_user", currentUser);
  };

  const addFriend = (newFriend: UserConversation) => {
    const alreadyExists = isMyFriend(user, newFriend);

    if (!alreadyExists) {
      friendList.push(newFriend);
      currentUser["friends"] = friendList;
      setUser(currentUser);
      TokenService.save(null, currentUser);
      updateUser(currentUser);
    }
  };

  const handleClickFriend = async (userId: string) => {
    let chatAlreadyIsOpen = false;
    let conversationFind = {} as Conversation;

    updatedConversation.map((conversation) => {
      if (!conversation.members) {
        return;
      }
      conversation?.members.map((member) => {
        if (member._id === userId) {
          chatAlreadyIsOpen = true;
          conversationFind = conversation;
        }
      });
    });

    if (!chatAlreadyIsOpen) {
      const createdConversation: Conversation =
        await MessageService.createConversation(userId, user.uid);
      const { members } = createdConversation;
      const [member] = extractUserFromMembers(members, user);
      setMember(member);
      setUpdatedConversation([createdConversation, ...updatedConversation]);
    }

    handleClickChat(conversationFind._id);
  };

  return {
    deleteFriend,
    addFriend,
    handleClickFriend,
  };
};
