import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../../features/_global/components/NotFound";
import { RootViews } from "../../features/_global/views";
import { LoginViews } from "../../features/auth/views/LoginViews";
import { RegisterViews } from "../../features/auth/views/RegisterViews";
import { ChatsViews } from "../../features/chats/views/ChatsViews";
import { ProfileViews } from "../../features/profile/views/ProfileViews";
import { FriendsViews } from "../../features/friends/views/FriendsViews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootViews />,
    children: [
      {
        path: "/chats",
        element: <ChatsViews />,
      },
      {
        path: "/profile",
        element: <ProfileViews />,
      },
      {
        path: "/friends",
        element: <FriendsViews />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginViews />,
  },
  {
    path: "/register",
    element: <RegisterViews />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
