"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { articles } from "@/apis";

import Table from "@/components/molecules/Table";

const ArticlesPage = () => {
  const currentPage = useSearchParams().get("page");

  const page = useMemo(
    () => (currentPage == null ? 1 : Number(currentPage)),
    [currentPage]
  );

  const { data: articlesData } = useQuery({
    queryKey: [articles.name, { page }],
    queryFn: () => articles({ page, desc: "ArticlesPage" }),
  });
  console.log(
    "🚀 ~ file: page.tsx:23 ~ ArticlesPage ~ articlesData:",
    articlesData
  );

  // const { pagination, rows } = useMemo(() => {
  //   if (articlesData == null) return { pagination: undefined, rows: undefined };

  //   const { data, pagination } = articlesData;

  //   return { pagination, rows: data };
  // }, [articlesData]);

  // const columns = [
  //   {
  //     key: "id",
  //     display: "",
  //   },
  //   {
  //     key: "title",
  //     display: "",
  //   },
  //   {
  //     key: "user",
  //     display: "",
  //   },
  //   {
  //     key: "createdAt",
  //     display: "",
  //   },
  // ];

  return (
    <div>
      <Table />
    </div>
  );
};

export default ArticlesPage;
