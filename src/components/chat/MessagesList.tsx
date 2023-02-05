/* eslint-disable react/no-unescaped-entities */
import { Input } from "components/common/Input";
import { useHandleMessages } from "hooks/useMessages";
import { extractUserFromMembers } from "./../../utils/extractUserFromMembers";
import { useUser } from "hooks/useUser";
import { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { useEffect } from "react";
import { useSocket } from "hooks/useSocket";
import { MessageViewProps } from "./MessagesView";
import { FriendList } from "./FriendsList";
import { MessageChannelPreview } from "./MessageChannelPreview";
import { useConversations } from "hooks/useConversations";
import { useHandleFriendList } from "hooks/useHandleFriendList";

interface MessageListProps extends MessageViewProps {}

export const MessagesList = ({ setOpenChat }: MessageListProps) => {
  const [selected, setSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("");
  const {
    conversations: updatedConversation,
    setConversations: setUpdatedConversation,
  } = useConversations();
  const [openContacts, setOpenContacts] = useState(false);
  const { socket } = useSocket();
  const userLogged = useUser((state) => state.user);
  const { handleClickFriend } = useHandleFriendList();
  const { handleClickChat } = useHandleMessages();

  useEffect(() => {
    socket.on("new.message.listener", async (data) => {
      const i = updatedConversation.findIndex(
        (conv) => conv._id === data.conversationId
      );

      const conv = [...updatedConversation];
      if (!!conv[i]) {
        conv[i].messages.push(data);
        setUpdatedConversation(conv);
      }
    });
  }, [setUpdatedConversation, socket, updatedConversation]);

  useEffect(() => {
    socket.on("updatedChannel", (data) => {
      const i = updatedConversation.findIndex(
        (conv) => conv._id === data.conversationId
      );
      const conv = [...updatedConversation];

      conv[i] = data;
      setUpdatedConversation(conv);
    });
  }, [setUpdatedConversation, socket, updatedConversation]);

  return (
    <div className="flex w-screen h-screen overflow-hidden md:static flex-col p-1 md:w-full justify-center items-center md:p-6 md:max-w-[300px] bg-messages">
      <div className="pt-10 sm:pt-10 sm:mt-11 md:mt-10 h-screen md:h-full w-full flex flex-col gap-6">
        {!openContacts && (
          <>
            <div className="flex items-center">
              <h3 className="flex px-7 md:px-0 text-sm font-bold font-DM-Sans md:text-3xl text-white">
                Messages
              </h3>
              <FaAddressBook
                className="md:grow cursor-pointer"
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
              {!!updatedConversation &&
                updatedConversation?.map((conversation, index) => {
                  const [member] = extractUserFromMembers(
                    conversation?.members,
                    userLogged
                  );
                  return (
                    <MessageChannelPreview
                      isFriendList={false}
                      setOpenChat={setOpenChat}
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
                      }
                    />
                  );
                })}
            </div>
          </>
        )}
        {openContacts && (
          <FriendList
            openContacts={openContacts}
            setOpenContacts={setOpenContacts}
            isFriendList
            selected={selected}
            setOpenChat={setOpenChat}
            selectedFriend={selectedFriend}
            setSelectedFriend={setSelectedFriend}
            setSelected={setSelected}
            handleClickFriend={handleClickFriend}
          />
        )}
      </div>
    </div>
  );
};
