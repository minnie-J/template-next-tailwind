import { ReactNode } from "react";
import classNames from "classnames";

const ArticlesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classNames("flex", "flex-grow", "justify-center", "pt-40")}>
      <div
        className={classNames(
          "flex",
          "flex-col",
          "max-w-[66rem]",
          "w-full",
          "gap-5"
        )}
      >
        <div className={classNames("flex", "flex-col", "gap-1")}>
          <h1 className={classNames("text-4xl", "font-bold")}>title area</h1>
          <p>description</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ArticlesLayout;
