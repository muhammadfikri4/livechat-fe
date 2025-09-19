import { useState } from "react";
import { Button } from "../../_global/components/Button";
import { Modal } from "../../_global/components/Dialog/dialog-v2";
import { Input } from "../../_global/components/Input";
import { InputLabel } from "../../_global/components/InputLabel";
import { Poppins } from "../../_global/components/Text";
import { useModal } from "../../_global/hooks/useModal";
import { useAddFriend } from "../hooks/useFriendCreation";
import { useFriend } from "../hooks/useFriend";

interface FriendProps {
  name: string;
  description?: string;
}

const Friend: React.FC<FriendProps> = ({ name, description }) => {
  return (
    <div className="flex gap-4">
      <div className="w-20 bg-gray-500 rounded-xl"></div>
      <div className="flex flex-col gap-2">
        <Poppins className="font-semibold">{name}</Poppins>
        <Poppins className="text-xs text-gray-500">
          {description || "-"}
        </Poppins>
      </div>
    </div>
  );
};

export const FriendsViews = () => {
  const { closeModal, isOpen, openModal } = useModal();
  const mutation = useAddFriend();
  const [code, setCode] = useState("");
  const { data: friends } = useFriend();
  return (
    <>
      <div className="px-6 py-6 flex flex-col gap-6">
        <div className="flex items-center gap-4 w-full">
          <div className="w-48">
            <Button onClick={openModal}>Add Friend</Button>
          </div>
          <div className="w-full">
            <Input inputSize="sm" placeholder="Search..." />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {friends?.data?.map((item, index) => (
            <Friend
              name={item.friend.name}
              key={index}
              description={item.friend.description}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="min-w-96 min-h-40 flex flex-col gap-4">
          <InputLabel
            title="Friend Code"
            direction="column"
            inputProps={{
              onChange: (e) => setCode(e.target.value),
            }}
          />
          <Button
            variant={mutation.isPending ? "disabled" : "primary"}
            onClick={() => mutation.mutate({ code })}
          >
            {mutation.isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </Modal>
    </>
  );
};
