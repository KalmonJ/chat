import { SearchIcon } from "components/icons/SearchIcon";
import { Input } from "./Input";
import { Menu } from "./Menu";

export const Header = () => {
  return (
    <header className="bg-header h-[76px] w-full border-b border-group flex justify-end items-center">
      <div className="flex w-1/2 justify-between p-2 pr-[38px]">
        <div className="flex items-center bg-[#050505] px-2 rounded-md ">
          <Input placeholder="Search anything..." />
          <SearchIcon />
        </div>
        <Menu />
      </div>
    </header>
  );
};
