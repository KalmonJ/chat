import { Avatar } from "components/common/Avatar";
import { User } from "services/UserService";
import { UserCoversation } from "utils/extractUserFromMembers";

export interface AvatarFromMessagesProps {
  member: UserCoversation | User | UserCoversation;
}

export const AvatarFromMessages = ({ member }: AvatarFromMessagesProps) => {
  return (
    <div className="flex items-center" tabIndex={1}>
      <div className="mr-2">
        <Avatar profileImage={member.profileImage} username={member.username} />
      </div>
      <div className="flex flex-col gap-1 grow mr-4">
        <h4 className=" hidden md:flex text-white font-DM-Sans font-bold text-base leading-4">
          {member.username}
        </h4>
        <span className="text-typing font-DM-Sans font-normal text-sm leading-4"></span>
      </div>
      <div className="hidden md:flex flex-col gap-1">
        {/* <div className="rounded-full w-4 h-4 bg-notification flex justify-center self-end">
          <span className="text-xs text-white font-bold font-DM-Sans"></span>
        </div> */}
      </div>
    </div>
  );
};
