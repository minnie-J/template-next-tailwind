import Link from "next/link";

import Icon, { IconIdType } from "@/components/atoms/Icon";

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
        <div className="flex items-center space-x-1">
          <Icon iconId={iconId} className="text-xs" />
          <span className="text-sm">{name}</span>
        </div>
      </Link>
    </li>
  );
};

export default MainMenuItem;
