import HIMTI from "../../../../core/assets/logo/HIMTI.png";
import { Group } from "./Group";

export const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 left-20 right-20 flex items-center justify-center z-50">
        <div className="w-[100vw] h-24 flex px-4 items-center bg-white rounded-bl-3xl rounded-br-3xl justify-between shadow-[0_1px_10px_rgba(0,0,0,0.1)]">
          <img src={HIMTI} className="max-w-[8%]" />
          <Group />
        </div>
      </div>
    </>
  );
};
