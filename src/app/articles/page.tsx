"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const ArticlesPage = () => {
  const pathname = usePathname();
  return (
    <div className={classNames("flex", "flex-grow", "flex-col")}>
      <div>title area</div>
      <ul>
        <Link href={`${pathname}/1`}>go to article</Link>
      </ul>
    </div>
  );
};

export default ArticlesPage;
