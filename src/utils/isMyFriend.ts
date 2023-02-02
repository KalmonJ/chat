import { User } from "services/UserService";
import { UserConversation } from "./extractUserFromMembers";

export const isMyFriend = (user: User, otherUser: UserConversation) => {
  if (!user || !otherUser) {
    return;
  }
  const find = user.friends?.findIndex(
    (friendItem) => friendItem._id === otherUser._id
  );
  if (find !== -1) {
    return true;
  }
  return false;
};
