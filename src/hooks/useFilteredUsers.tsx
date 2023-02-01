import { ChangeEvent, useMemo, useState } from "react";
import { UserCoversation } from "utils/extractUserFromMembers";

export const useFilteredUsers = (users: UserCoversation[]) => {
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      ),
    [search, users]
  );

  return {
    handleChange,
    filteredUsers,
    search,
  };
};
