import { Message } from "hooks/useMessages";
import Image from "next/image";
import { User } from "services/UserService";

interface MessageBallonProps {
  message: Message;
  user: User;
}

export const MessageBallon = ({ message, user }: MessageBallonProps) => {
  return (
    <div
      key={message._id}
      className={`p-4 bg-header mt-1 rounded-lg w-fit ${
        message.sender === user.uid ? "self-end" : "self-start"
      }`}
    >
      {!!message.text && !message.image && (
        <span className="text-caption font-medium font-DM-Sans text-sm">
          {message.text}
        </span>
      )}

      {message.image && (
        <Image
          src={message.image}
          width={100}
          height={100}
          loading="lazy"
          alt={message._id}
        />
      )}
    </div>
  );
};
