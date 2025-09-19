import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useProfile } from "../../../profile/useProfile";
import { CONFIG_APP } from "../../../../core/configs/app";
import { Poppins } from "../Text";
import DefaultImage from "@core/assets/default-photo.svg";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { LogoutConfirmation } from "../../../dashboard/components/navbar/LogoutConfirmation";
import { Skeleton } from "../Shimer";

interface AuthSectionProps {
  direction?: "row" | "column";
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  direction = "row",
}) => {
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
  const { data: profile, isFetching } = useProfile();
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      {token || isFetching ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {isFetching ? (
              <>
                <Skeleton width="8rem" height="0.8rem" />
                <Skeleton width="2rem" height="2rem" borderRadius="100%" />
                <Skeleton height="1.8rem" width="5rem" />
              </>
            ) : (
              <>
                <Poppins className="text-xs">
                  {profile?.data?.name || "unknown"}
                </Poppins>
                <img
                  src={
                    !profile?.data?.photo || isFetching
                      ? DefaultImage
                      : profile?.data?.photo
                  }
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = DefaultImage)
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div
                  className="border border-solid border-red-500 h-8 flex items-center gap-2 rounded-md bg-red-700 hover:bg-red-500 duration-300 px-1 pr-2 cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                >
                  <CiLogout className="text-white" />
                  <Poppins className="text-xs text-white">Logout</Poppins>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`flex gap-4 ${
            direction === "row" ? "flex-row" : "flex-col"
          } lg:flex-nowrap flex-wrap items-center justify-center w-full`}
        >
          <div className="w-28">
            <Link to="/sign-in">
              <Button size="md" rounded="full" variant="secondary">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="w-28">
            <Link to="/sign-up">
              <Button rounded="full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
      <LogoutConfirmation onHide={() => setShow((prev) => !prev)} show={show} />
    </>
  );
};
