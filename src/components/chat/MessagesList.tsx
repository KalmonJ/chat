/* eslint-disable react/no-unescaped-entities */
import { Input } from "components/common/Input";
import { useConversationId } from "./../../hooks/useConversationId";
import { Conversation, MessageService } from "services/MessageService";
import { useMessages } from "hooks/useMessages";
import { extractUserFromMembers } from "./../../utils/extractUserFromMembers";
import { useUser } from "hooks/useUser";
import { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { useEffect } from "react";
import { useSocket } from "hooks/useSocket";
import { MessageViewProps } from "./MessagesView";
import { FriendList } from "./FriendsList";
import { MessageChannelPreview } from "./MessageChannelPreview";

interface MessageListProps extends MessageViewProps {
  conversations: Conversation[];
}

export const MessagesList = ({
  conversations,
  setOpenChat,
}: MessageListProps) => {
  const { setConversationId, setMember } = useConversationId();
  const [selected, setSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [updatedConversation, setUpdatedConversation] =
    useState<Conversation[]>(conversations);
  const [openContacts, setOpenContacts] = useState(false);
  const { socket } = useSocket();
  const userLogged = useUser((state) => state.user);
  const saveMessages = useMessages((state) => state.setMessages);

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
    const messages = await MessageService.getMessages(conversationId);
    const [{ members }] = updatedConversation.filter(
      (conv) => conv._id === conversationId
    );
    const [member] = extractUserFromMembers(members, userLogged);
    saveMessages(messages);
    setConversationId(conversationId);
    setMember(member);
  };

  const handleClickFriend = async (userId: string) => {
    let chatAlreadyIsOpen = false;
    let conversationFind = {} as Conversation;

    updatedConversation.map((conversation) => {
      if (!conversation.members) {
        return;
      }
      conversation?.members.map((member) => {
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
                updatedConversation?.map((conversation) => {
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
            setUpdatedConversation={setUpdatedConversation}
            handleClickFriend={handleClickFriend}
          />
        )}
      </div>
    </div>
  );
};
