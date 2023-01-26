import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { useUser } from "hooks/useUser";
import { Avatar } from "./Avatar";

export const Menu = () => {
  const loggedUser = useUser((state) => state.user);

  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger className="outline-none">
        <Avatar
          profileImage={loggedUser.profileImage}
          username={loggedUser.username}
        />
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          className="min-w-[202px] rounded-md bg-white shadow-lg p-3 animate-slide-down"
          sideOffset={5}
        >
          <DropdownPrimitive.Item className="outline-none cursor-pointer">
            Logout
          </DropdownPrimitive.Item>
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
};
