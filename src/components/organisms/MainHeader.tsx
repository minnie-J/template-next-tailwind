import { MAIN_MENUS } from "@/constants";
import classNames from "classnames";

import MainMenuItem from "@/components/molecules/MainMenuItem";

const MainHeader = () => {
  return (
    <nav
      className={classNames(
        "flex",
        "h-12",
        "min-h-[3rem]",
        "items-center",
        "border-b",
        "bg-white",
        "px-8",
        "text-black"
      )}
    >
      <ul className={classNames("flex", "space-x-6")}>
        {MAIN_MENUS.map((menu) => (
          <MainMenuItem key={menu.iconId} {...menu} />
        ))}
      </ul>
    </nav>
  );
};

export default MainHeader;
