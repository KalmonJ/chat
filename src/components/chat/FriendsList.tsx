/* eslint-disable react/no-unescaped-entities */
import { Input } from "components/common/Input";
import { useAllUsers } from "hooks/useAllUsers";
import { useFilteredUsers } from "hooks/useFilteredUsers";
import { useSocket } from "hooks/useSocket";
import { useUser } from "hooks/useUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { Conversation, MessageService } from "services/MessageService";
import { TokenService } from "services/TokenService";
import { User } from "services/UserService";
import {
  MessageChannelPreview,
  MessageChannelPreviewProps,
} from "./MessageChannelPreview";

export interface FriendListProps
  extends Pick<
    MessageChannelPreviewProps,
    | "handleClickFriend"
    | "selectedFriend"
    | "setSelectedFriend"
    | "isFriendList"
    | "selected"
    | "setSelected"
    | "setOpenChat"
  > {
  setOpenContacts: Dispatch<SetStateAction<boolean>>;
  setUpdatedConversation: Dispatch<SetStateAction<Conversation[]>>;
  openContacts: boolean;
}

export const FriendList = ({
  openContacts,
  selectedFriend,
  setOpenContacts,
  setSelectedFriend,
  handleClickFriend,
  isFriendList,
  selected,
  setOpenChat,
  setSelected,
  setUpdatedConversation,
}: FriendListProps) => {
  const { setUser, user } = useUser();
  const { socket } = useSocket();
  const allUsers = useAllUsers((state) => state.allUsers);
  const { filteredUsers, handleChange, search } = useFilteredUsers(allUsers);

  const deleteFriend = (friendId: string) => {
    const friendList = [...user.friends];
    const currentUser = { ...user };
    const newFriendList = friendList.filter(
      (friend) => friend._id !== friendId
    );
    currentUser["friends"] = newFriendList;
    setUser(currentUser);
    TokenService.save(null, currentUser);
    updateUser(currentUser);
  };

  const updateUser = (currentUser: User) => {
    socket.emit("deleteFriend", currentUser);
  };

  const addFriend = (userId: string) => {};

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
