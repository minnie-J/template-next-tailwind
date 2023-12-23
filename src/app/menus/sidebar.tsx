"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { listMain } from "@/api/menus";

import Loading from "@/components/atoms/Loading";

const Sidebar = () => {
  const params = useParams();

  const { data: mainDatas, isLoading } = useQuery<
    Array<{ id: string; name: string }>
  >({
    queryKey: [listMain.name],
    queryFn: listMain,
  });

  return (
    <div className={classNames("flex", "h-full", "grow", "flex-col")}>
      {isLoading ? (
        <Loading />
      ) : mainDatas?.length ? (
        <ul>
          {mainDatas.map(({ id, name }) => (
            <li key={id}>
              <Link
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
                href={`/menus/${id}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={classNames("flex", "items-center", "justify-center")}>
          Empty
        </div>
      )}
    </div>
  );
};

export default Sidebar;
