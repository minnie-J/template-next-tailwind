"use client";

import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { Article, articles } from "@/api/articles";
import { useModal } from "@/hooks";

import Table, { Columns } from "@/components/molecules/Table";

const ArticlesPage = ({
  searchParams: { page: currentPage },
}: {
  searchParams: { page: string };
}) => {
  const page = useMemo(
    () => (currentPage == null ? 0 : Number(currentPage)),
    [currentPage]
  );

  // NOTE Suspense
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
      render: (obj) => obj.user.name,
    },
    {
      key: "createdAt",
      display: "작성일",
    },
  ];

  const {
    setModal: setModalAlpha,
    modalPortal: modalAlpha,
    closeModal: closeAlpha,
  } = useModal();
  const {
    setModal: setModalBeta,
    modalPortal: modalBeta,
    closeModal: closeBeta,
  } = useModal();
  const onClickRow = (row?: Article) => {
    console.log("🚀 ~ onClickRow ~ row:", row);
    setModalAlpha(
      <div
        className={classNames(
          "w-full",
          "h-full",
          "flex",
          "items-center",
          "justify-center",
          "fixed",
          "inset-0",
          "bg-[rgba(0,0,0,0.34)]"
        )}
        onClick={closeAlpha}
      >
        <div
          className={classNames(
            "w-60",
            "h-28",
            "p-8",
            "flex",
            "items-center",
            "justify-center",
            "bg-white",
            "text-black"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setModalBeta(
              <div
                className={classNames(
                  "w-full",
                  "h-full",
                  "flex",
                  "items-center",
                  "justify-center",
                  "fixed",
                  "inset-0",
                  "bg-[rgba(0,0,0,0.34)]"
                )}
                onClick={closeBeta}
              >
                <div
                  className={classNames(
                    "w-36",
                    "h-20",
                    "p-8",
                    "flex",
                    "items-center",
                    "justify-center",
                    "bg-white",
                    "text-black"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  테스트2
                </div>
              </div>
            );
          }}
        >
          테스트1
        </div>
      </div>
    );
  };

  return (
    <>
      {modalBeta}
      {modalAlpha}
      <Table columns={columns} rows={rows} onClickRow={onClickRow} />;
    </>
  );
};

export default ArticlesPage;
