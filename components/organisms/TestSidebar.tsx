"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { listMain } from "@/apis";

const TestSidebar = ({
  initMainDatas,
}: {
  initMainDatas: Array<{ id: string; name: string }>;
}) => {
  const { data: mainDatas, isLoading } = useQuery<
    Array<{ id: string; name: string }>
  >({
    queryKey: ["mainDatas"],
    queryFn: listMain,
    initialData: initMainDatas,
  });

  const params = useParams();

  return (
    <div className={classNames("flex", "h-full", "grow", "flex-col")}>
      {isLoading ? (
        <div className={classNames("flex", "items-center", "justify-center")}>
          loading...
        </div>
      ) : mainDatas ? (
        mainDatas.map(({ id, name }) => (
          <div
            key={id}
            className={classNames(
              "flex",
              "h-12",
              "cursor-pointer",
              "items-center",
              "px-5",
              "hover:bg-slate-50",
              {
                "font-bold": params.id === `${id}`,
                "text-blue-500": params.id === `${id}`,
              },
            )}
          >
            {name}
          </div>
        ))
      ) : (
        <div className={classNames("flex", "items-center", "justify-center")}>
          Empty
        </div>
      )}
    </div>
  );
};

export default TestSidebar;
