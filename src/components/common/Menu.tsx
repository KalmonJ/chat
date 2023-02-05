import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { HiMenu } from "react-icons/hi";
import { useHandleMessages } from "./../../hooks/useMessages";
import { useHandleConversations } from "hooks/useConversations";

export const Menu = () => {
  // const loggedUser = useUser((state) => state.user);
  const { deleteAllMessages } = useHandleMessages();
  const { getActiveConversation, deleteCurrentChannel } =
    useHandleConversations();

  const activeConversation = getActiveConversation();

  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger className="outline-none">
        <HiMenu color="white" fontSize={22} />
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          className="min-w-[30px] mr-8 rounded-md bg-white py-2 shadow-lg animate-slide-down"
          sideOffset={5}
        >
          <DropdownPrimitive.Item
            onClick={() => {
              deleteAllMessages(activeConversation?._id || "");
            }}
            className="outline-none cursor-pointer transition-all py-2 hover:bg-gray-100 px-4 font-DM-Sans font-medium text-sm"
          >
            Delete messages
          </DropdownPrimitive.Item>
          <DropdownPrimitive.Item
            onClick={() => {
              deleteCurrentChannel(activeConversation?._id || "");
            }}
            className="outline-none cursor-pointer transition-all py-2 px-4 hover:bg-gray-100 w-full font-DM-Sans font-medium text-sm"
          >
            Delete channel
          </DropdownPrimitive.Item>
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
};
