import { Input } from "components/common/Input";
import { useConversationId } from "hooks/useConversationId";
import { useState } from "react";
import { useSocket } from "./../../hooks/useSocket";
import { useUser } from "./../../hooks/useUser";

export const MessagesView = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const user = useUser((state) => state.user);

  const conversationId = useConversationId((state) => state.conversationId);

  const { socket } = useSocket();

  const handlePressEnter = () => {
    console.log(conversationId, "conversationId");

    socket.emit("message", {
      conversationId: conversationId,
      text: message,
      sender: user.uid,
    });
  };

  return (
    <div className="bg-group min-w-[600px] flex justify-start w-full h-full flex-col">
      <div className=" w-full overflow-auto mt-[77px] p-12 flex grow h-[500px]"></div>
      <div className="bg-input h-[88px] w-full flex items-center justify-center">
        <Input
          className="rounded-[25px] bg-header max-w-[609px] h-[50px] w-full outline-none px-4 text-caption"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePressEnter();
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
