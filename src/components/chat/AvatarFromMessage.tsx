import { Avatar } from "components/common/Avatar";
import { Message } from "hooks/useMessages";
import { User } from "services/UserService";
import { UserCoversation } from "utils/extractUserFromMembers";
import { FormatDate } from "utils/formatDate";
import { MessageChannelPreviewProps } from "./MessageChannelPreview";

export interface AvatarFromMessagesProps
  extends Partial<
    Pick<MessageChannelPreviewProps, "selected" | "entity" | "selectedFriend">
  > {
  member: UserCoversation | User | UserCoversation;
  last_message: Message | undefined;
}

export const AvatarFromMessages = ({
  member,
  last_message,
  entity,
  selected,
  selectedFriend,
}: AvatarFromMessagesProps) => {
  return (
    <div className="flex items-center" tabIndex={1}>
      <div className="mr-2">
        <Avatar profileImage={member.profileImage} username={member.username} />
      </div>
      <div className="flex flex-col gap-1 grow mr-4">
        <div className="flex items-center">
          <h4 className=" grow flex text-white font-DM-Sans font-bold text-base leading-4">
            {member.username}
          </h4>
          <span className="text-hour font-DM-Sans font-medium text-[13px]">
            {!!last_message?.text &&
              entity &&
              last_message.conversationId === entity._id &&
              FormatDate(last_message.updatedAt)}
          </span>
        </div>
        <span
          className={`font-DM-Sans text-sm w-full leading-4 ${
            selected && entity && selectedFriend === entity._id
              ? "text-white font-bold"
              : !selected && entity && selectedFriend === entity._id
              ? "text-white font-bold"
              : "text-hour font-normal"
          }`}
        >
          <p className="text-ellipsis overflow-hidden w-3/4 whitespace-nowrap">
            {last_message?.text}
          </p>
        </span>
      </div>
      {/* <div className="hidden absolute right-8 bottom-1 md:flex flex-col gap-1">
        <div className="rounded-full w-4 h-4 bg-notification flex justify-center self-end">
          <span className="text-xs text-white font-bold font-DM-Sans">2</span>
        </div>
      </div> */}
    </div>
  );
};
