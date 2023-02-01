import { useUser } from "./useUser";
import { TokenService } from "services/TokenService";
import { User } from "services/UserService";
import { useSocket } from "./useSocket";
import { UserCoversation } from "utils/extractUserFromMembers";

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
    socket.emit("deleteFriend", currentUser);
  };

  const addFriend = (newFriend: UserCoversation) => {
    friendList.push(newFriend); // TODO: implementar o add friend
  };

  return {
    deleteFriend,
  };
};
