import { MessagesList } from "components/chat/MessagesList";
import { MessagesView } from "components/chat/MessagesView";
import { Navbar } from "components/common/Navbar";
import { useAllUsers } from "hooks/useAllUsers";
import { useMediaQuery } from "hooks/useMediaQuery";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { Conversation, MessageService } from "services/MessageService";
import { User, UserService } from "services/UserService";
import { UserCoversation } from "utils/extractUserFromMembers";
import { useUser } from "./../hooks/useUser";

interface ChatPageProps {
  currentUser: User;
  conversations: Conversation[];
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
  const [openChat, setOpenChat] = useState(false);
  const match = useMediaQuery("(max-width: 770px)");

  useEffect(() => {
    setUser(props.currentUser);
    setAllUsers(props.allUsers);
  }, [props.currentUser, setUser, props.allUsers, setAllUsers]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="hidden md:flex">
          <Navbar />
        </div>
        <div className="w-full flex">
          <MessagesList
            setOpenChat={setOpenChat}
            conversations={props?.conversations}
          />
          {openChat && match ? (
            <MessagesView setOpenChat={setOpenChat} />
          ) : !openChat && match ? null : (
            <MessagesView />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
