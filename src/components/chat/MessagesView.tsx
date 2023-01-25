import { Input } from "components/common/Input";
import { SendDocumentIcon } from "components/icons/SendDocumentIcon";
import { SendEmojiIcon } from "components/icons/SendEmojiIcon";
import { SendLocationIcon } from "components/icons/SendLocationIcon";
import { SendMessageIcon } from "components/icons/SendMessageIcon";
import { SendVoiceMessageIcon } from "components/icons/SendVoiceMessageIcon";
import { useConversationId } from "hooks/useConversationId";
import { useMessages } from "hooks/useMessages";
import { ChangeEvent, useEffect, useState } from "react";
import { useSocket } from "./../../hooks/useSocket";
import { useUser } from "./../../hooks/useUser";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import { MessageService } from "services/MessageService";
import { MessageBallon } from "./MessageBallon";
import gsap from "gsap";
import EmojiPicker from "emoji-picker-react";
import Theme from "emoji-picker-react/dist/types/exposedTypes";

export const MessagesView = () => {
  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const { socket } = useSocket();
  const setMessages = useMessages((state) => state.setMessages);
  const user = useUser((state) => state.user);
  const conversationId = useConversationId((state) => state.conversationId);
  const messages = useMessages((state) => state.messages);
  const saveMessages = useMessages((state) => state.setMessages);
  const sendFileRef = useRef<HTMLInputElement | null>();

  useEffect(() => {
    socket.on("messages", (data) => {
      saveMessages([...messages, data]);
    });
  }, [socket, saveMessages, messages]);

  const handleSendMessage = () => {
    socket.emit("message", {
      conversationId: conversationId,
      text: message,
      sender: user.uid,
    });

    setMessage("");
  };

  const handleSendDocument = () => {
    sendFileRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileObject = e.target.files && e.target.files[0];

    if (!fileObject) {
      return;
    }

    const newMessage = await MessageService.sendFile(
      fileObject,
      conversationId,
      user.uid
    );
    setMessages([...messages, newMessage.response]);
  };

  return (
    <div className="bg-group flex justify-start w-full h-full flex-col overflow-y-hidden">
      <div className=" w-full overflow-auto mt-[77px] p-12 flex grow h-[500px] flex-col">
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

        <div className="bg-input h-[88px] relative px-7 w-full flex items-center justify-center">
          <div className="rounded-[25px] bg-header px-4 max-w-[609px] flex items-center h-[50px] w-full outline-none text-caption">
            <SendVoiceMessageIcon className="cursor-pointer hidden md:block" />
            <Input
              className="rounded-[25px] bg-header max-w-[609px] h-[50px] w-full outline-none px-4 text-caption"
              value={message}
              placeholder="Send message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={(ref) => (sendFileRef.current = ref)}
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <SendDocumentIcon
                className="cursor-pointer hidden md:block"
                width={28}
                onClick={handleSendDocument}
              />

              <SendEmojiIcon
                width={28}
                role="button"
                className="cursor-pointer"
                onClick={() => {
                  setOpenEmoji(!openEmoji);
                }}
              />
              <SendMessageIcon
                role="button"
                className="cursor-pointer"
                width={28}
                onClick={() => {
                  handleSendMessage();
                }}
              />
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
