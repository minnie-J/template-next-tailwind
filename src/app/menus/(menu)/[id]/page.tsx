"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { listSub } from "@/api/menus";
import { DETAIL_MENUS } from "@/constants";

import SplitLayout from "@/components/templates/SplitLayout";
import SubMenuItem from "@/components/atoms/SubMenuItem";

const tabKeys = DETAIL_MENUS.map(({ key }) => key);
type TabType = (typeof tabKeys)[number];

const MenuPage = ({ params: { id } }: { params: { id: string } }) => {
  const [currentTab, setCurrentTab] = useState<TabType>("sub1");

  const { data } = useQuery<Array<{ id: string; name: string }>>({
    queryKey: [listSub.name, { id, tab: currentTab }],
    queryFn: () => listSub({ id, tab: currentTab }),
  });

  const { Element } = SplitLayout;
  return (
    <SplitLayout direction="vertical">
      <Element
        className={classNames("grow", "bg-gray-200", "text-gray-400")}
        height={50}
      >
        {DETAIL_MENUS.map(({ name, key }) => (
          <SubMenuItem
            key={key}
            isActive={currentTab === key}
            onClick={() => setCurrentTab(key)}
          >
            {name}
          </SubMenuItem>
        ))}
      </Element>
      <Element className={classNames("flex-col", "border-l")}>
        {data?.map(({ id, name }) => <div key={id}>{name}</div>)}
      </Element>
    </SplitLayout>
  );
};

export default MenuPage;
