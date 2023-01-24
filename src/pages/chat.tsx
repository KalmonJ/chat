import { MessagesList } from "components/chat/MessagesList";
import { MessagesView } from "components/chat/MessagesView";
import { Header } from "components/common/Header";
import { Navbar } from "components/common/Navbar";
import { useAllUsers } from "hooks/useAllUsers";
import { NextPageContext } from "next";
import { useEffect } from "react";
import { MessageService } from "services/MessageService";
import { User, UserService } from "services/UserService";
import { UserCoversation } from "utils/extractUserFromMembers";
import { useUser } from "./../hooks/useUser";

interface ChatPageProps {
  currentUser: User;
  conversations: any[];
  allUsers: UserCoversation[];
}

export async function getServerSideProps(ctx: NextPageContext) {
  const currentUser: User = UserService.get(ctx);
  const conversations = await MessageService.getConversations(currentUser.uid);
  const response = await UserService.getAllUsers();

  return {
    props: {
      allUsers: response.users,
      currentUser,
      conversations,
    },
  };
}

export const Chat = (props: ChatPageProps) => {
  const setUser = useUser((state) => state.setUser);
  const setAllUsers = useAllUsers((state) => state.setAllUsers);

  useEffect(() => {
    setUser(props.currentUser);
    setAllUsers(props.allUsers);
  }, [props.currentUser, setUser, props.allUsers, setAllUsers]);

  return (
    <div className="flex flex-col">
      <div className="absolute">
        <Header />
      </div>
      <div className="flex">
        <Navbar />
        <div className="w-full flex ">
          <MessagesList conversations={props?.conversations} />
          <MessagesView />
        </div>
      </div>
    </div>
  );
};

export default Chat;
