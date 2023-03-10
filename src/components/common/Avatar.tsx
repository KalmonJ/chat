import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { extractFirstLetter } from "utils/extractFirstLetter";
import { UserConversation } from "utils/extractUserFromMembers";

interface AvatarProps
  extends Pick<UserConversation, "profileImage" | "username"> {}

export const Avatar = ({ profileImage, username }: AvatarProps) => {
  return (
    <div>
      <AvatarPrimitive.Root className="inline-flex h-[40px] outline-none w-[40px] items-center align-middle overflow-hidden select-none rounded-full bg-slate-500 ">
        <AvatarPrimitive.AvatarImage
          className="w-full outline-none h-full object-cover rounded-full"
          src={profileImage}
          alt="random image"
        />
        <AvatarPrimitive.AvatarFallback className="w-full h-full flex items-center justify-center bg-white text-icon text-[16px] font-normal">
          {extractFirstLetter(username)}
        </AvatarPrimitive.AvatarFallback>
      </AvatarPrimitive.Root>
    </div>
  );
};
