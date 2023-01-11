import { Avatar } from "components/common/Avatar";
import { UserCoversation } from "utils/extractUserFromMembers";

export interface AvatarFromMessagesProps {
  member: UserCoversation;
}

export const AvatarFromMessages = ({ member }: AvatarFromMessagesProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <Avatar />
      </div>
      <div className="flex flex-col gap-1 grow mr-4">
        <h4 className="text-white font-DM-Sans font-bold text-base leading-4">
          {member.username}
        </h4>
        <span className="text-typing font-DM-Sans font-normal text-sm leading-4">
          Typing...
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-hour font-DM-Sans font-medium text-xs leading-4">
          4:30 PM
        </span>
        <div className="rounded-full w-4 h-4 bg-notification flex justify-center self-end">
          <span className="text-xs text-white font-bold font-DM-Sans">2</span>
        </div>
      </div>
    </div>
  );
};
