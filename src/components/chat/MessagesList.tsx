/* eslint-disable react/no-unescaped-entities */
import { Input } from "components/common/Input";
import { useConversationId } from "./../../hooks/useConversationId";
import { Conversation, MessageService } from "services/MessageService";
import { useMessages } from "hooks/useMessages";
import { extractUserFromMembers } from "./../../utils/extractUserFromMembers";
import { useUser } from "hooks/useUser";
import { useState } from "react";
import { MessageChannelPreview } from "./MessageChannelPreview";
import { FaAddressBook } from "react-icons/fa";
import { useEffect } from "react";
import { useSocket } from "hooks/useSocket";

export const MessagesList = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  const setConversationId = useConversationId(
    (state) => state.setConversationId
  );
  const [selected, setSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("");
  const userLogged = useUser((state) => state.user);
  const saveMessages = useMessages((state) => state.setMessages);
  const [openContacts, setOpenContacts] = useState(false);
  const { socket } = useSocket();
  const [updatedConversation, setUpdatedConversation] =
    useState<Conversation[]>(conversations);

  useEffect(() => {
    socket.on("new.message.listener", async (data) => {
      const i = updatedConversation.findIndex(
        (conv) => conv._id === data.conversationId
      );
      const conv = [...updatedConversation];
      conv[i].messages.push(data);
      setUpdatedConversation(conv);
    });
  }, [socket, updatedConversation]);

  const handleClickChat = async (conversationId: string) => {
    setConversationId(conversationId);
    const messages = await MessageService.getMessages(conversationId);
    saveMessages(messages);
  };

  const handleClickFriend = async (userId: string) => {
    let chatAlreadyIsOpen = false;
    let conversationFind = {} as Conversation;

    updatedConversation.map((conversation) => {
      conversation.members.map((member) => {
        if (member._id === userId) {
          chatAlreadyIsOpen = true;
          conversationFind = conversation;
        }
      });
    });

    if (!chatAlreadyIsOpen) {
      const createdConversation = await MessageService.createConversation(
        userId,
        userLogged.uid
      );

      return setUpdatedConversation([
        ...updatedConversation,
        createdConversation,
      ]);
    }

    handleClickChat(conversationFind._id);
  };

  return (
    <div className="flex flex-col p-1 w-[80px] justify-center items-center md:p-6 max-w-[300px] md:w-full bg-messages">
      <div className="pt-10 sm:pt-10 mt-11 md:mt-10 h-[849px] w-full flex flex-col gap-6">
        {!openContacts && (
          <>
            <div className="flex items-center">
              <h3 className="hidden md:flex text-sm font-bold font-DM-Sans md:text-3xl text-white">
                Messages
              </h3>
              <FaAddressBook
                className="grow cursor-pointer"
                fontSize={23}
                color="lightBlue"
                onClick={() => {
                  setOpenContacts(!openContacts);
                }}
              />
            </div>
            <div className="hidden md:block">
              <Input placeholder="Search..." />
            </div>
            <div className="h-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
              {updatedConversation?.map((conversation) => {
                const [member] = extractUserFromMembers(
                  conversation.members,
                  userLogged
                );

                return (
                  <MessageChannelPreview
                    key={conversation._id}
                    entity={conversation}
                    handleClickChat={handleClickChat}
                    member={member}
                    selected={selected}
                    selectedFriend={selectedFriend}
                    setSelected={setSelected}
                    setSelectedFriend={setSelectedFriend}
                    last_message={
                      conversation.messages[conversation.messages.length - 1]
                        ?.text
                    }
                  />
                );
              })}
            </div>
          </>
        )}
        {openContacts && (
          <>
            <div className="flex items-center">
              <h2 className="hidden md:flex text-sm font-bold font-DM-Sans md:text-3xl text-white ">
                Friends
              </h2>
              <FaAddressBook
                className="grow cursor-pointer"
                fontSize={23}
                color="lightBlue"
                onClick={() => {
                  setOpenContacts(!openContacts);
                }}
              />
            </div>
            <div className="hidden md:block">
              <Input placeholder="Search..." />
            </div>
            <ul className="h-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
              {userLogged.friends?.length === 0 ||
                (!userLogged.friends && (
                  <div>
                    <h2 className="hidden md:flex text-sm font-bold font-DM-Sans md:text-sm text-white mt-7">
                      You don't have any friends yet... 😭
                    </h2>
                  </div>
                ))}
              {userLogged?.friends?.map((friend) => (
                <MessageChannelPreview
                  key={friend._id}
                  entity={friend}
                  handleClickFriend={handleClickFriend}
                  member={friend}
                  selected={selected}
                  selectedFriend={selectedFriend}
                  setSelected={setSelected}
                  setSelectedFriend={setSelectedFriend}
                  last_message={undefined}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
