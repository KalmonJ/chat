import { Input } from "components/common/Input";
import { SendDocumentIcon } from "components/icons/SendDocumentIcon";
import { SendEmojiIcon } from "components/icons/SendEmojiIcon";
import { SendLocationIcon } from "components/icons/SendLocationIcon";
import { SendMessageIcon } from "components/icons/SendMessageIcon";
import { SendVoiceMessageIcon } from "components/icons/SendVoiceMessageIcon";
import { useConversationId } from "hooks/useConversationId";
import { useLocation } from "hooks/useLocation";
import { useMessages } from "hooks/useMessages";
import { useSocket } from "hooks/useSocket";
import { useUser } from "hooks/useUser";
import { useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import { MessageService } from "services/MessageService";

interface InputMessageProps {
  setOpenEmoji: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  openEmoji: boolean;
  message: string;
}

export const InputMessage = ({
  setOpenEmoji,
  openEmoji,
  message,
  setMessage,
}: InputMessageProps) => {
  const sendFileRef = useRef<HTMLInputElement | null>();
  const setCoords = useLocation((state) => state.setCoords);
  const conversationId = useConversationId((state) => state.conversationId);
  const setMessages = useMessages((state) => state.setMessages);
  const messages = useMessages((state) => state.messages);
  const user = useUser((state) => state.user);
  const { socket } = useSocket();

  const handleSendLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });

        socket.emit("message", {
          conversationId: conversationId,
          text: "This is my current location:",
          sender: user.uid,
          messageDate: new Date(),
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
      });
    }
  };

  const handleSendDocument = () => {
    sendFileRef.current?.click();
  };

  const handleSendMessage = () => {
    socket.emit("message", {
      conversationId: conversationId,
      text: message,
      sender: user.uid,
      messageDate: new Date(),
    });

    setMessage("");
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
            accept="image/*"
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
            onClick={handleSendLocation}
            width={28}
          />
        </div>
      </div>
    </div>
  );
};
