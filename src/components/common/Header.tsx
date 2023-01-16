import { SearchIcon } from "components/icons/SearchIcon";
import { useAllUsers } from "hooks/useAllUsers";
import { useFilteredUsers } from "hooks/useFilteredUsers";
import { Input } from "./Input";
import { Menu } from "./Menu";
import { FaPlus } from "react-icons/fa";
import { useSocket } from "hooks/useSocket";
import { useUser } from "hooks/useUser";

export const Header = () => {
  const allUsers = useAllUsers((state) => state.allUsers);
  const { handleChange, filteredUsers, search } = useFilteredUsers(allUsers);

  const { socket } = useSocket();
  const { user, setUser } = useUser();

  const handleClick = (userId: string) => {
    console.log(userId, "id user");
    socket.emit("addFriends", { addId: userId, loggedUser: user });
    socket.on("updatedUser", (data) => {
      setUser(data.loggedUser);
    });
  };

  console.log(user, "usuário");

  return (
    <header className="bg-header h-[76px] w-screen border-b border-group flex justify-end items-center">
      <div className="flex w-1/2 justify-between p-2 pr-[38px]">
        <div className="flex flex-col">
          <div className="flex items-center bg-[#050505] px-2 rounded-md ">
            <Input placeholder="Search anything..." onChange={handleChange} />
            <SearchIcon />
          </div>
          {!!search && (
            <div className="w-[250px] min-h-[100px] p-2 bg-header z-50 absolute bottom-[-95px] rounded-b-md flex flex-col">
              {filteredUsers.map((user) => {
                return (
                  <div
                    key={user?._id}
                    className="flex items-center justify-between"
                    role="button"
                    onClick={() => {
                      handleClick(user?._id);
                    }}
                  >
                    <span className="text-description font-DM-Sans font-bold">
                      {user.username}
                    </span>
                    <FaPlus color="white" className="cursor-pointer" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Menu />
      </div>
    </header>
  );
};
