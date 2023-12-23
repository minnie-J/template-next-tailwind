"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Article, articles } from "@/api/articles";

import Table, { Columns } from "@/components/molecules/Table";

const ArticlesPage = () => {
  const currentPage = useSearchParams().get("page");

  const page = useMemo(
    () => (currentPage == null ? 0 : Number(currentPage)),
    [currentPage]
  );

  const { data: articlesData } = useSuspenseQuery({
    queryKey: [articles.name, { page }],
    queryFn: async () => await articles({ page, desc: "ArticlesPage" }),
  });

  const { rows } = useMemo(() => {
    if (articlesData == null) return { pagination: undefined, rows: undefined };

    const { data, pagination } = articlesData;

    return { pagination, rows: data };
  }, [articlesData]);

  const columns: Columns<Article> = [
    {
      key: "id",
      display: "No",
    },
    {
      key: "title",
      display: "제목",
    },
    {
      key: "user",
      display: "작성자",
      render(obj) {
        return obj.user.name;
      },
    },
    {
      key: "createdAt",
      display: "작성일",
    },
  ];

  return <Table columns={columns} rows={rows} />;
};

export default ArticlesPage;