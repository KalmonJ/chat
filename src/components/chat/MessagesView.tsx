import { useMessages } from "hooks/useMessages";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSocket } from "./../../hooks/useSocket";
import { useUser } from "./../../hooks/useUser";
import { Transition } from "react-transition-group";
import { MessageBallon } from "./MessageBallon";
import { InputMessage } from "./InputMessage";
import { MessageViewHeader } from "./MessageViewHeader";
import gsap from "gsap";
import EmojiPicker from "emoji-picker-react";
import Theme from "emoji-picker-react/dist/types/exposedTypes";
import { useConversationId } from "hooks/useConversationId";

export interface MessageViewProps {
  setOpenChat?: Dispatch<SetStateAction<boolean>>;
}

export const MessagesView = ({ setOpenChat }: MessageViewProps) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const user = useUser((state) => state.user);
  const messages = useMessages((state) => state.messages);
  const { conversationId } = useConversationId();
  const saveMessages = useMessages((state) => state.setMessages);

  useEffect(() => {
    socket.on("messages", (data) => {
      saveMessages([...messages, data]);
    });
  }, [socket, saveMessages, messages]);

  console.log(user, "usuário");

  // if (conversationId === "") {
  //   return (
  //     <Image
  //       src="https://images.unsplash.com/photo-1673280439175-b52a6743f756?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80"
  //       width={300}
  //       height={300}
  //       className="object-cover"
  //       alt={""}
  //     />
  //   );
  // }

  return (
    <div className="absolute flex md:static md:flex bg-group justify-center w-full h-screen flex-col overflow-y-hidden">
      <MessageViewHeader setOpenChat={setOpenChat} />
      <div className="w-full overflow-auto md:mt-[10px] p-3 md:p-7 flex grow h-[500px] flex-col">
        {!!messages.length &&
          messages?.map((message) => (
            <MessageBallon key={message._id} message={message} user={user} />
          ))}
      </div>
      <div className="relative">
        <Transition
          timeout={500}
          in={openEmoji}
          mountOnEnter
          unmountOnExit
          addEndListener={(node, done) => {
            gsap.to(node, {
              translateY: openEmoji ? undefined : "300px",
              opacity: openEmoji ? undefined : 0,
              duration: 0.6,
              ease: "easeIn",
              onComplete: done,
            });
          }}
        >
          <div className="absolute top-[-450px] animate-slide-up right-56">
            <EmojiPicker
              theme={"dark" as Theme.Theme.DARK}
              lazyLoadEmojis
              onEmojiClick={(e) => {
                setMessage(message.concat(e.emoji));
              }}
            />
          </div>
        </Transition>
        <InputMessage
          message={message}
          setMessage={setMessage}
          openEmoji={openEmoji}
          setOpenEmoji={setOpenEmoji}
        />
      </div>
    </div>
  );
};
