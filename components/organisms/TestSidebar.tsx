"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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

  const { id } = useParams();

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : mainDatas ? (
        mainDatas.map(({ id, name }) => <div key={id}>{name}</div>)
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default TestSidebar;
