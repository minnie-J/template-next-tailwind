"use client";

import { useQuery } from "@tanstack/react-query";

const TestSidebar = () => {
  const { data: mainDatas, isLoading } = useQuery<
    Array<{ id: number; name: string }>
  >({
    queryKey: ["mainDatas"],
    queryFn: async () => {
      return await fetch("http://localhost:4000/mainDatas").then((res) =>
        res.json(),
      );
    },
  });

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
