import { ReactNode } from "react";
import classNames from "classnames";

import SplitLayout from "@/components/templates/SplitLayout";

const ArticleLayout = ({
  children,
  comments,
  articlesByAuthor,
}: {
  children: ReactNode;
  comments: ReactNode;
  articlesByAuthor: ReactNode;
}) => {
  return (
    <div className={classNames("flex", "grow", "justify-center")}>
      <main className={classNames("flex", "py-16")}>
        <SplitLayout direction="vertical">
          <article className={classNames("w-[44rem]", "min-h-[38rem]")}>
            {children}
          </article>
          <section>{comments}</section>
        </SplitLayout>
        <aside className={classNames("w-80")}>{articlesByAuthor}</aside>
      </main>
    </div>
  );
};

export default ArticleLayout;
