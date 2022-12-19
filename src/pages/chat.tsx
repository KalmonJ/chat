import { MessagesList } from "components/chat/MessagesList";
import { Header } from "components/common/Header";
import { Navbar } from "components/common/Navbar";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { User, UserService } from "services/UserService";
import { io } from "socket.io-client";

interface ChatPageProps {
  currentUser: User;
}

export function getServerSideProps(ctx: NextPageContext) {
  const currentUser: User = UserService.get(ctx);
  return {
    props: {
      currentUser,
    },
  };
}

export const Chat = (props: ChatPageProps) => {
  // const [message, setMessage] = useState("");

  // const socket = io("http://localhost:8080");

  // socket.on("messages", (data) => {
  //   console.log("message from back end:", data);
  // });

  // const handleSend = () => {
  //   console.log("hello");
  //   socket.emit("message", { message: "hello socket io" });
  // };

  return (
    <div className="flex flex-col">
      <div className="absolute w-full">
        <Header />
      </div>
      <div className="flex">
        <Navbar />
        <div className="w-full flex ">
          <MessagesList />
        </div>
      </div>
    </div>
  );
};

export default Chat;
