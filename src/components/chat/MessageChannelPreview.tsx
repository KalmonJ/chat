import { useSocket } from "hooks/useSocket";
import { SetStateAction, useEffect, useState } from "react";
import { Conversation } from "services/MessageService";
import { UserCoversation } from "utils/extractUserFromMembers";
import {
  AvatarFromMessages,
  AvatarFromMessagesProps,
} from "./AvatarFromMessage";

interface MessageChannelPreviewProps
  extends Pick<AvatarFromMessagesProps, "last_message"> {
  handleClickChat?: (conversationId: string) => void;
  handleClickFriend?: (friendId: string) => void;
  setSelected: (value: SetStateAction<boolean>) => void;
  setSelectedFriend: (value: SetStateAction<string>) => void;
  selectedFriend: string;
  member: UserCoversation;
  selected: boolean;
  entity: Conversation | UserCoversation;
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
}: MessageChannelPreviewProps) => {
  return (
    <div
      key={entity._id}
      onClick={() => {
        if (handleClickChat) {
          handleClickChat(entity._id);
        }
        if (handleClickFriend) {
          handleClickFriend(entity._id);
        }
        if (!selected) {
          setSelected(true);
        } else {
          setSelected(false);
        }
        setSelectedFriend(entity._id);
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
        date={undefined}
      />
    </div>
  );
};
