import { User } from "services/UserService";

export type UserConversation = {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
};

export const extractUserFromMembers = (
  members: UserConversation[],
  loggedUser: User
) => {
  const user = members?.filter((member) => member?._id !== loggedUser?.uid);
  return user;
};
