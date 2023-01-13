/* eslint-disable react/no-unescaped-entities */
import { Input } from "components/common/Input";
import { AvatarFromMessages } from "./AvatarFromMessage";
import { useConversationId } from "./../../hooks/useConversationId";
import { MessageService } from "services/MessageService";
import { useMessages } from "hooks/useMessages";
import { extractUserFromMembers } from "./../../utils/extractUserFromMembers";
import { useUser } from "hooks/useUser";
import { useSocket } from "hooks/useSocket";
import { useEffect, useState } from "react";

export const MessagesList = ({ conversations }: { conversations: any[] }) => {
  const setConversationId = useConversationId(
    (state) => state.setConversationId
  );
  const userLogged = useUser((state) => state.user);
  const saveMessages = useMessages((state) => state.setMessages);
  const [updatedConversation, setUpdatedConversation] =
    useState<any[]>(conversations);

  const { socket } = useSocket();

  useEffect(() => {
    const filterConversations = (data: any) => {
      const conversationsCopy = [...conversations];
      const index = conversationsCopy.findIndex(
        (conversation) => conversation._id === data._id
      );
      conversationsCopy[index] = data;
      setUpdatedConversation(conversationsCopy);
    };

    socket.on("updatedChannel", (data) => {
      filterConversations(data);
    });
  }, [conversations, socket]);

  const handleClickChat = async (conversationId: string) => {
    setConversationId(conversationId);
    const messages = await MessageService.getMessages(conversationId);
    saveMessages(messages);
  };

  console.log(userLogged, "usuário logado");

  return (
    <div className="flex flex-col p-1 w-[80px] justify-center items-center md:p-6 max-w-[300px] md:w-full bg-messages">
      <div className="pt-10 sm:pt-10 mt-11 md:mt-0 h-[750px] w-full flex flex-col gap-6">
        <h3 className="hidden md:flex text-sm font-bold font-DM-Sans md:text-3xl text-white">
          Messages
        </h3>
        <div className="hidden md:block">
          <Input placeholder="Search..." />
        </div>
        {updatedConversation?.map((conversation, index) => {
          console.log(updatedConversation, "updateddd?");

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
        <h2 className="hidden md:flex text-sm font-bold font-DM-Sans md:text-3xl text-white mt-7">
          Friends
        </h2>
        <div className="hidden md:block">
          <Input placeholder="Search..." />
        </div>
        {userLogged.friends?.length === 0 ||
          (!userLogged.friends && (
            <div>
              <h2 className="hidden md:flex text-sm font-bold font-DM-Sans md:text-sm text-white mt-7">
                You don't have any friends yet... 😭
              </h2>
            </div>
          ))}
        {userLogged?.friends?.map((friend) => (
          <div key={friend.uid}>
            <span>{friend.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
