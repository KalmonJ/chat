import { Input } from "components/common/Input";
import { AvatarFromMessage } from "./AvatarFromMessage";

export const MessagesList = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 max-w-[333px] w-full bg-messages">
      <div className="h-[750px] w-full flex flex-col gap-6">
        <h3 className="font-bold font-DM-Sans text-3xl text-white">Messages</h3>
        <Input placeholder="Search..." />
        <AvatarFromMessage />
      </div>
    </div>
  );
};
