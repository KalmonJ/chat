import { Avatar } from "components/common/Avatar";
import { User } from "services/UserService";

interface AvatarFromMessageProps extends Pick<User, "username"> {
  profileImg: string;
  text: string;
}

export const AvatarFromMessage = () => {
  return (
    <div className="flex items-center" role="button">
      <div className="mr-2">
        <Avatar />
      </div>
      <div className="flex flex-col gap-1 grow mr-4">
        <h4 className="text-white font-DM-Sans font-bold text-base leading-4">
          Killan James
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
