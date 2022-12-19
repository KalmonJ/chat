import { Avatar } from "./Avatar";
import { Input } from "./Input";
import { Menu } from "./Menu";

export const Header = () => {
  return (
    <header className="bg-header h-[76px] w-full border-b border-group flex justify-evenly items-center">
      <Input placeholder="Search anything..." />
      <Menu />
    </header>
  );
};
