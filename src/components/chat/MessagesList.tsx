import { Input } from "components/common/Input";
import { AvatarFromMessages } from "./AvatarFromMessage";
import { useConversationId } from "./../../hooks/useConversationId";
import { MessageService } from "services/MessageService";
import { useMessages } from "hooks/useMessages";
import { extractUserFromMembers } from "./../../utils/extractUserFromMembers";
import { useUser } from "hooks/useUser";

export const MessagesList = ({ conversations }: { conversations: any[] }) => {
  const setConversationId = useConversationId(
    (state) => state.setConversationId
  );
  const userLogged = useUser((state) => state.user);
  const saveMessages = useMessages((state) => state.setMessages);

  const handleClickChat = async (conversationId: string) => {
    setConversationId(conversationId);
    const messages = await MessageService.getMessages(conversationId);
    saveMessages(messages);
  };

  return (
    <div className="flex flex-col p-1 w-[80px] justify-center items-center md:p-6 max-w-[300px] md:w-full bg-messages">
      <div className="pt-10 sm:pt-10 mt-11 md:mt-0 h-[750px] w-full flex flex-col gap-6">
        <h3 className=" hidden md:flex text-sm font-bold font-DM-Sans md:text-3xl text-white">
          Messages
        </h3>
        <div className="hidden md:block">
          <Input placeholder="Search..." />
        </div>
        {conversations?.map((conversation, index) => {
          const [member] = extractUserFromMembers(
            conversation.members,
            userLogged
          );

          return (
            <div
              key={conversation._id}
              onClick={() => {
                handleClickChat(conversation._id);
              }}
            >
              <AvatarFromMessages
                conversationId={conversation._id}
                member={member}
                key={conversation._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
