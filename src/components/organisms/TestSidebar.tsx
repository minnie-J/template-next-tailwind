"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { listMain } from "@/apis";

const TestSidebar = () => {
  const { data: mainDatas, isLoading } = useQuery<
    Array<{ id: string; name: string }>
  >({
    queryKey: [listMain.name],
    queryFn: listMain,
  });

  const params = useParams();
  const { push } = useRouter();

  const onClickMenu = (id: string) => push(`/prefetch/${id}`);

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
              }
            )}
            onClick={() => onClickMenu(id)}
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
