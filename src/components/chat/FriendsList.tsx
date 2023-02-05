/* eslint-disable react/no-unescaped-entities */
import { Input } from "components/common/Input";
import { useAllUsers } from "hooks/useAllUsers";
import { useFilteredUsers } from "hooks/useFilteredUsers";
import { useHandleFriendList } from "hooks/useHandleFriendList";
import { useUser } from "hooks/useUser";
import { Dispatch, SetStateAction } from "react";
import { FaAddressBook } from "react-icons/fa";
import {
  MessageChannelPreview,
  MessageChannelPreviewProps,
} from "./MessageChannelPreview";

export interface FriendListProps
  extends Pick<
    MessageChannelPreviewProps,
    | "selectedFriend"
    | "setSelectedFriend"
    | "isFriendList"
    | "selected"
    | "setSelected"
    | "setOpenChat"
  > {
  setOpenContacts: Dispatch<SetStateAction<boolean>>;
  openContacts: boolean;
}

export const FriendList = ({
  openContacts,
  selectedFriend,
  setOpenContacts,
  setSelectedFriend,
  isFriendList,
  selected,
  setOpenChat,
  setSelected,
}: FriendListProps) => {
  const { user } = useUser();
  const allUsers = useAllUsers((state) => state.allUsers);
  const { filteredUsers, handleChange, search } = useFilteredUsers(allUsers);
  const { addFriend, deleteFriend, handleClickFriend } = useHandleFriendList();

  return (
    <>
      <div className="flex items-center">
        <h2 className="px-7 md:px-0 flex text-sm font-bold font-DM-Sans md:text-3xl text-white ">
          Friends
        </h2>
        <FaAddressBook
          className="md:grow cursor-pointer"
          fontSize={22}
          color="lightBlue"
          onClick={() => {
            setOpenContacts(!openContacts);
          }}
        />
      </div>
      <div className="hidden md:block">
        <Input placeholder="Search a friend..." onChange={handleChange} />
      </div>
      <ul className="h-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {/* {user?.friends?.length === 0 ||
          (!user?.friends && (
            <div>
              <h2 className="hidden md:flex text-sm font-bold font-DM-Sans md:text-sm text-white mt-7">
                You don't have any friends yet... 😭
              </h2>
            </div>
          ))} */}
        {!search.length &&
          user?.friends?.map((friend) => (
            <MessageChannelPreview
              isFriendList={isFriendList}
              setOpenChat={setOpenChat}
              key={friend._id}
              entity={friend}
              handleClickFriend={handleClickFriend}
              member={friend}
              selected={selected}
              selectedFriend={selectedFriend}
              setSelected={setSelected}
              setSelectedFriend={setSelectedFriend}
              deleteFriend={deleteFriend}
              last_message={undefined}
            />
          ))}

        {search.length > 0 &&
          filteredUsers.map((users) => (
            <MessageChannelPreview
              isFriendList={isFriendList}
              setOpenChat={setOpenChat}
              key={users._id}
              entity={users}
              handleClickFriend={handleClickFriend}
              member={users}
              selected={selected}
              selectedFriend={selectedFriend}
              setSelected={setSelected}
              setSelectedFriend={setSelectedFriend}
              deleteFriend={deleteFriend}
              last_message={undefined}
              addFriend={addFriend}
            />
          ))}
      </ul>
    </>
  );
};
