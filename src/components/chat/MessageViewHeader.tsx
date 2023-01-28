import { useConversationId } from "hooks/useConversationId";
import { FaArrowLeft } from "react-icons/fa";
import { AvatarFromMessages } from "./AvatarFromMessage";
import { MessageViewProps } from "./MessagesView";

export const MessageViewHeader = ({ setOpenChat }: MessageViewProps) => {
  const { member } = useConversationId();

  return (
    <div className="bg-group h-[30px] shadow-md w-full p-8 flex items-center">
      <FaArrowLeft
        color="white"
        fontSize={32}
        className="cursor-pointer md:hidden"
        onClick={() => {
          setOpenChat && setOpenChat(false);
        }}
      />

      <AvatarFromMessages member={member} last_message={undefined} />
    </div>
  );
};
