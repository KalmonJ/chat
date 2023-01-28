import { Message } from "hooks/useMessages";
import { useSocket } from "hooks/useSocket";
import { SetStateAction, useEffect, useState } from "react";
import { Conversation } from "services/MessageService";
import { UserCoversation } from "utils/extractUserFromMembers";
import {
  AvatarFromMessages,
  AvatarFromMessagesProps,
} from "./AvatarFromMessage";
import { MessageViewProps } from "./MessagesView";

export interface MessageChannelPreviewProps extends MessageViewProps {
  handleClickChat?: (conversationId: string) => void;
  handleClickFriend?: (friendId: string) => void;
  setSelected: (value: SetStateAction<boolean>) => void;
  setSelectedFriend: (value: SetStateAction<string>) => void;
  selectedFriend: string;
  member: UserCoversation;
  selected: boolean;
  entity: Conversation | UserCoversation;
  last_message: Message | undefined;
}

export const MessageChannelPreview = ({
  handleClickChat,
  member,
  selected,
  setSelected,
  setSelectedFriend,
  entity,
  selectedFriend,
  handleClickFriend,
  last_message,
  setOpenChat,
}: MessageChannelPreviewProps) => {
  return (
    <div
      key={entity._id}
      onClick={() => {
        setOpenChat && setOpenChat(true);
        setSelectedFriend(entity._id);
        handleClickChat && handleClickChat(entity._id);
        handleClickFriend && handleClickFriend(entity._id);
        if (!selected) {
          setSelected(true);
        } else {
          setSelected(false);
        }
      }}
      className={`hoverAnimation ${
        selected && entity._id === selectedFriend
          ? "selectedVariant"
          : !selected && entity._id === selectedFriend && "selectedVariant"
      } mr-2`}
    >
      <AvatarFromMessages
        member={member}
        last_message={last_message}
        key={entity._id}
        selected={selected}
        selectedFriend={selectedFriend}
        entity={entity}
      />
    </div>
  );
};
