import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CONFIG_APP } from "../../../core/configs/app";
import { FriendDTO } from "../../../core/model/friend";

const socket = io(CONFIG_APP.BASE_URL);

export function useFriendSocket(initialFriends: FriendDTO[]) {
  const [friends, setFriends] = useState<FriendDTO[]>(initialFriends);
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);

  useEffect(() => {
    setFriends(initialFriends);
  }, [initialFriends]);

  useEffect(() => {
    if (!token) return;

    socket.emit("login", token);

    socket.on("user-status", (friend: FriendDTO) => {
      setFriends((prev) =>
        prev.map((f) =>
          f.id === friend.id ? { ...f, isOnline: friend.isOnline } : f
        )
      );
    });

    return () => {
      socket.off("user-status");
    };
  }, [token]);

  return { friends, setFriends };
}
