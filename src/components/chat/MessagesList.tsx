import { Input } from "components/common/Input";
import { AvatarFromMessages } from "./AvatarFromMessage";
import { useConversationId } from "./../../hooks/useConversationId";
import { MessageService } from "services/MessageService";
import { useMessages } from "hooks/useMessages";

export const MessagesList = ({ conversations }: { conversations: any[] }) => {
  const setConversationId = useConversationId(
    (state) => state.setConversationId
  );

  const saveMessages = useMessages((state) => state.setMessages);

  const handleClickChat = async (conversationId: string) => {
    setConversationId(conversationId);
    const messages = await MessageService.getMessages(conversationId);
    saveMessages(messages);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 max-w-[333px] w-full bg-messages">
      <div className="h-[750px] w-full flex flex-col gap-6">
        <h3 className="font-bold font-DM-Sans text-3xl text-white">Messages</h3>
        <Input placeholder="Search..." />
        {conversations?.map((conversation) => {
          return (
            <div
              key={conversation._id}
              onClick={() => {
                handleClickChat(conversation._id);
              }}
            >
              <AvatarFromMessages key={conversation._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
