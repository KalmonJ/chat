import { SetStateAction } from "react";
import { Conversation } from "services/MessageService";
import { UserCoversation } from "utils/extractUserFromMembers";
import { AvatarFromMessages } from "./AvatarFromMessage";

interface MessageChannelPreviewProps {
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
      }`}
    >
      <AvatarFromMessages member={member} key={entity._id} />
    </div>
  );
};
