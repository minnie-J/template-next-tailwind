"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { listSub } from "@/apis";
import { DETAIL_MENUS } from "@/constants";

import SplitLayout from "@/components/templates/SplitLayout";
import SubMenuItem from "@/components/atoms/SubMenuItem";

const tabKeys = DETAIL_MENUS.map(({ key }) => key);
type TabType = (typeof tabKeys)[number];

const DetailPage = () => {
  const { id } = useParams();

  const [currentTab, setCurrentTab] = useState<TabType>("sub1");

  const { data } = useQuery<Array<{ id: string; name: string }>>({
    queryKey: ["subData", { id, tab: currentTab }],
    queryFn: () => listSub({ id: `${id}`, tab: currentTab }),
  });

  const { Element } = SplitLayout;
  return (
    <SplitLayout direction="vertical">
      <Element height={50}>
        <div
          className={classNames(
            "flex",
            "grow",
            "h-full",
            "bg-gray-200",
            "text-gray-400",
          )}
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
        </div>
      </Element>
      <Element>
        <div className={classNames("flex", "flex-col", "border-l")}>
          {data?.length != null &&
            data?.map(({ id, name }) => <div key={id}>{name}</div>)}
        </div>
      </Element>
    </SplitLayout>
  );
};

export default DetailPage;
