import Link from "next/link";

import { MAIN_MENUS } from "@/constants";

import Icon from "@/components/atoms/Icon";

const MainHeader = () => {
  return (
    <nav className="flex h-12 items-center border-b  bg-white px-8 text-black">
      <ul className="flex space-x-6">
        {MAIN_MENUS.map(({ url, iconId, name }) => (
          <li key={iconId}>
            <Link href={url}>
              <div className="flex items-center space-x-1">
                <Icon iconId={iconId} className="text-xs" />
                <span className="text-sm">{name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainHeader;
