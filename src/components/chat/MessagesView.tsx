import { Input } from "components/common/Input";
import { SendDocumentIcon } from "components/icons/SendDocumentIcon";
import { SendEmojiIcon } from "components/icons/SendEmojiIcon";
import { SendLocationIcon } from "components/icons/SendLocationIcon";
import { SendMessageIcon } from "components/icons/SendMessageIcon";
import { SendVoiceMessageIcon } from "components/icons/SendVoiceMessageIcon";
import { useConversationId } from "hooks/useConversationId";
import { useMessages } from "hooks/useMessages";
import { useEffect, useState } from "react";
import { useSocket } from "./../../hooks/useSocket";
import { useUser } from "./../../hooks/useUser";
import gsap from "gsap";
import EmojiPicker from "emoji-picker-react";
import Theme from "emoji-picker-react/dist/types/exposedTypes";
import { Transition } from "react-transition-group";

export const MessagesView = () => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const user = useUser((state) => state.user);
  const conversationId = useConversationId((state) => state.conversationId);
  const messages = useMessages((state) => state.messages);
  const saveMessages = useMessages((state) => state.setMessages);
  const [openEmoji, setOpenEmoji] = useState(false);

  useEffect(() => {
    socket.on("messages", (data) => {
      saveMessages([...messages, data]);
    });
  }, [socket, saveMessages, messages]);

  const handlePressEnter = () => {
    socket.emit("message", {
      conversationId: conversationId,
      text: message,
      sender: user.uid,
    });

    setMessage("");
  };

  return (
    <div className="bg-group flex justify-start w-full h-full flex-col overflow-y-hidden">
      <div className=" w-full overflow-auto mt-[77px] p-12 flex grow h-[500px] flex-col">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`p-4 bg-header mt-1 rounded-lg w-fit ${
              message.sender === user.uid ? "self-end" : "self-start"
            }`}
          >
            <span className="text-caption font-medium font-DM-Sans text-sm">
              {message.text}
            </span>
          </div>
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

        <div className="bg-input h-[88px] relative px-7 w-full flex items-center justify-center">
          <div className="rounded-[25px] bg-header px-4 max-w-[609px] flex items-center h-[50px] w-full outline-none text-caption">
            <SendVoiceMessageIcon className="cursor-pointer hidden md:block" />
            <Input
              className="rounded-[25px] bg-header max-w-[609px] h-[50px] w-full outline-none px-4 text-caption"
              value={message}
              placeholder="Send message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePressEnter();
                }
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <div className="flex items-center gap-4">
              <SendDocumentIcon
                className="cursor-pointer hidden md:block"
                width={28}
              />
              <SendEmojiIcon
                width={28}
                className="cursor-pointer"
                onClick={() => {
                  setOpenEmoji(!openEmoji);
                }}
              />
              <SendMessageIcon className="cursor-pointer" width={28} />
              <SendLocationIcon
                className="cursor-pointer hidden md:block"
                width={28}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
