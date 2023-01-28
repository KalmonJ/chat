import { useMessages } from "hooks/useMessages";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSocket } from "./../../hooks/useSocket";
import { useUser } from "./../../hooks/useUser";
import { Transition } from "react-transition-group";
import { MessageBallon } from "./MessageBallon";
import { InputMessage } from "./InputMessage";
import gsap from "gsap";
import EmojiPicker from "emoji-picker-react";
import Theme from "emoji-picker-react/dist/types/exposedTypes";
import { MessageViewHeader } from "./MessageViewHeader";

export interface MessageViewProps {
  setOpenChat?: Dispatch<SetStateAction<boolean>>;
}

export const MessagesView = ({ setOpenChat }: MessageViewProps) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const user = useUser((state) => state.user);
  const messages = useMessages((state) => state.messages);
  const saveMessages = useMessages((state) => state.setMessages);

  useEffect(() => {
    socket.on("messages", (data) => {
      saveMessages([...messages, data]);
    });
  }, [socket, saveMessages, messages]);

  return (
    <div className="absolute flex md:static md:flex bg-group justify-center w-full h-screen flex-col overflow-y-hidden">
      <MessageViewHeader setOpenChat={setOpenChat} />
      <div className="w-full overflow-auto md:mt-[10px] p-3 md:p-12 flex grow h-[500px] flex-col">
        {messages.map((message) => (
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
