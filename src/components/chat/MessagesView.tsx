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

export const MessagesView = () => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const user = useUser((state) => state.user);
  const conversationId = useConversationId((state) => state.conversationId);
  const messages = useMessages((state) => state.messages);
  const saveMessages = useMessages((state) => state.setMessages);

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

  if (!messages.length) {
    return (
      <div className="bg-group min-w-[600px] flex justify-center items-center w-full h-full flex-col">
        <h3 className="text-white text-center absolute text-3xl">
          Select a channel and start new chat...
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-group min-w-[600px] flex justify-start w-full h-full flex-col">
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
      <div className="bg-input h-[88px] w-full flex items-center justify-center">
        <div className="rounded-[25px] bg-header max-w-[609px] flex items-center h-[50px] w-full outline-none px-4 text-caption">
          <SendVoiceMessageIcon className="cursor-pointer" />
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
            <SendDocumentIcon className="cursor-pointer" />
            <SendEmojiIcon className="cursor-pointer" />
            <SendMessageIcon className="cursor-pointer" />
            <SendLocationIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
