import { useUser } from "./useUser";
import { TokenService } from "services/TokenService";
import { User } from "services/UserService";
import { useSocket } from "./useSocket";
import { UserConversation } from "utils/extractUserFromMembers";
import { isMyFriend } from "utils/isMyFriend";

export const useHandleFriendList = () => {
  const { setUser, user } = useUser();
  const { socket } = useSocket();
  const friendList = [...user.friends];
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

  return {
    deleteFriend,
    addFriend,
  };
};
