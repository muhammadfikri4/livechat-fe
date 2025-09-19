import { BiGroup } from "react-icons/bi";
import { GrChat } from "react-icons/gr";
import { TbSmartHome } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const RootViews = () => {
  return (
    <>
      <Sidebar
        menus={[
          {
            icon: <TbSmartHome className="text-2xl" />,
            name: "Home",
            to: "/",
          },
          {
            icon: <GrChat className="text-xl" />,
            name: "Chats",
            to: "/chats",
          },
          {
            icon: <BiGroup className="text-2xl" />,
            name: "Friends",
            to: "/friends",
          },
          {
            icon: <VscSettings className="text-xl" />,
            name: "Profile",
            to: "/profile",
          },
        ]}
        name="Fikri Anto"
      />
      <div className="pl-20">
        <Outlet />
      </div>
    </>
  );
};
