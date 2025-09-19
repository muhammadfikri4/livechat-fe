import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Menus } from "../../config";
import { Poppins } from "../Text";
import { AuthSection } from "./AuthSection";
import { CONFIG_APP } from "../../../../core/configs/app";
import { useProfile } from "../../../profile/useProfile";

export const Group = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  const { data: profile, isFetching } = useProfile();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex lg:flex-row flex-row-reverse flex-wrap items-center justify-between w-full mx-5 gap-3">
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg border-none outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
        <GroupResponsive isOpen={isOpen} />
        <div className="flex items-center gap-5 lg-max:hidden my-1">
          {Menus.map((item, index) => (
            <Link to={item.to} key={index}>
              <Poppins
                className={`text-black ${
                  location.pathname === item.to
                    ? "font-semibold text-lg"
                    : "text-md"
                } duration-300`}
              >
                {item.name}
              </Poppins>
            </Link>
          ))}
          {token && profile?.data?.email && !isFetching && (
            <Link to={"/dashboard/enrolled-class"}>
              <Poppins className={`text-black text-md duration-300`}>
                Dashboard
              </Poppins>
            </Link>
          )}
          <AuthSection />
        </div>
      </div>
    </div>
  );
};

export const GroupResponsive = ({ isOpen }: { isOpen: boolean }) => {
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  const { data: profile, isFetching } = useProfile();
  return (
    <div
      className={`lg:hidden shadow-[0_1px_10px_rgba(0,0,0,0.1)] flex flex-col duration-300 items-center gap-7 absolute left-5 rounded-3xl mt-5 right-5 py-10 bg-white ${
        isOpen ? "top-[100%]" : "top-[-1000px] z-[-1]"
      }`}
    >
      {Menus.map((item, index) => (
        <Link to={item.to} key={index}>
          <span
            className={`text-black hover:text-gray-600 ${
              location.pathname === item.to
                ? "font-semibold text-lg"
                : "text-md"
            } duration-300`}
          >
            {item.name}
          </span>
        </Link>
      ))}
      {token && profile?.data?.email && !isFetching && (
        <Link to={"/dashboard/enrolled-class"}>
          <Poppins className={`text-black text-md duration-300`}>
            Dashboard
          </Poppins>
        </Link>
      )}
      <AuthSection direction="column" />
    </div>
  );
};
