import { MAIN_MENUS } from "@/constants";

import MainMenuItem from "@/components/molecules/MainMenuItem";

const MainHeader = () => {
  return (
    <nav className="flex h-12 items-center border-b  bg-white px-8 text-black">
      <ul className="flex space-x-6">
        {MAIN_MENUS.map((menu) => (
          <MainMenuItem key={menu.iconId} {...menu} />
        ))}
      </ul>
    </nav>
  );
};

export default MainHeader;
