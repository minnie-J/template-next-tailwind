import Link from "next/link";
import classNames from "classnames";

import Icon, { IconIdType } from "@/components/atoms/icon";

const MainMenuItem = ({
  url,
  iconId,
  name,
}: {
  url: string;
  iconId: IconIdType;
  name: string;
}) => {
  return (
    <li>
      <Link href={url}>
        <div className={classNames("flex", "items-center", "space-x-1")}>
          <Icon iconId={iconId} className="text-xs" />
          <span className="text-sm">{name}</span>
        </div>
      </Link>
    </li>
  );
};

export default MainMenuItem;
