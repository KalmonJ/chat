import { Menu } from "components/common/Menu";
import { useConversationId } from "hooks/useConversationId";
import { FaArrowLeft } from "react-icons/fa";
import { AvatarFromMessages } from "./AvatarFromMessages";
import { MessageViewProps } from "./MessagesView";

export const MessageViewHeader = ({ setOpenChat }: MessageViewProps) => {
  const { member } = useConversationId();

  return (
    <div className="bg-group h-[30px] shadow-md w-full p-8 flex items-center">
      <FaArrowLeft
        color="white"
        fontSize={32}
        className="cursor-pointer mr-3 md:hidden"
        onClick={() => {
          setOpenChat && setOpenChat(false);
        }}
      />

      <div className="flex items-center justify-between w-full">
        <AvatarFromMessages
          isFriendList={false}
          member={member}
          last_message={undefined}
        />

        <Menu />
      </div>
    </div>
  );
};
