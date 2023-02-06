import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useHandleConversations } from "hooks/useConversations";
import { useHandleMessages, useMessages } from "hooks/useMessages";
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface AlertDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isMessage?: boolean;
}

const Alert = ({ open, setOpen, isMessage }: AlertDialogProps) => {
  const { deleteAllMessages } = useHandleMessages();
  const { deleteCurrentChannel, getActiveConversation } =
    useHandleConversations();

  const activeConversation = getActiveConversation();

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className={` ${
            open ? "animate-fade-in" : "animate-fade-out"
          } fixed inset-0 flex justify-center bg-overlay backdrop-blur-sm z-[9999] `}
        />
        <AlertDialog.Content
          className={`bg-white ${
            open ? "animate-fade-in" : "animate-fade-out"
          } max-w-[500px] p-[25px] max-h-[85vh] w-[90vw] z-[10000] translate-x-[-50%] translate-y-[-50%] left-[50%] rounded-md shadow-lg fixed top-[50%]`}
        >
          <AlertDialog.Title className="font-bold font-DM-Sans mb-4 text-lg">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="font-DM-Sans font-normal text-caption">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <div className="flex gap-6 mt-4 justify-end">
            <AlertDialog.Cancel asChild>
              <button
                className="p-4 bg-gray-100 font-DM-Sans font-bold shadow-md rounded-lg"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => {
                  setOpen(false);

                  if (isMessage) {
                    return deleteAllMessages(activeConversation?._id || "");
                  }

                  deleteCurrentChannel(activeConversation?._id || "");
                }}
                className="p-4 bg-red-100 text-red-600 font-bold font-DM-Sans shadow-md rounded-lg"
              >
                Yes, delete {isMessage ? "all messages" : "channel"}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Alert;
