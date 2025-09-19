export interface AddFriendDTO {
  code: string;
}

export interface FriendDTO {
  id: string;
  friend: {
    id: string;
    name: string;
    description?: string;
  };
}
