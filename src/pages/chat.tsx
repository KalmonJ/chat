import { MessagesList } from "components/chat/MessagesList";
import { MessagesView } from "components/chat/MessagesView";
import { Header } from "components/common/Header";
import { Navbar } from "components/common/Navbar";
import { NextPageContext } from "next";
import { useEffect } from "react";
import { MessageService } from "services/MessageService";
import { User, UserService } from "services/UserService";
import { useUser as updateUser, useUser } from "./../hooks/useUser";

interface ChatPageProps {
  currentUser: User;
  conversations: any[];
}

export async function getServerSideProps(ctx: NextPageContext) {
  const currentUser: User = UserService.get(ctx);
  const conversations = await MessageService.getConversations(currentUser.uid);

  return {
    props: {
      currentUser,
      conversations,
    },
  };
}

export const Chat = (props: ChatPageProps) => {
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props.currentUser, setUser]);

  return (
    <div className="flex flex-col">
      <div className="absolute w-full">
        <Header />
      </div>
      <div className="flex">
        <Navbar />
        <div className="w-full flex">
          <MessagesList conversations={props.conversations} />
          <MessagesView />
        </div>
      </div>
    </div>
  );
};

export default Chat;
