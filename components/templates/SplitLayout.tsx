import { Children, ReactNode } from "react";
import classNames from "classnames";

const SplitLayout = ({
  children,
  direction = "horizontal",
}: {
  children: Array<ReactNode>;
  direction?: "horizontal" | "vertical";
}) => {
  const elements = Children.toArray(children);
  return (
    <div
      className={classNames("flex", "grow", "overflow-hidden", {
        "flex-col": direction === "vertical",
      })}
    >
      {...elements}
    </div>
  );
};

const Element = ({
  children,
  height,
  width,
}: {
  children: ReactNode;
  height?: number;
  width?: number;
}) => {
  return (
    <div
      className={classNames("flex", "h-full")}
      style={
        height
          ? { height: `${height}px`, minHeight: `${height}px` }
          : width
          ? { width: `${width}px`, minWidth: `${width}px` }
          : { flexGrow: 1 }
      }
    >
      {children}
    </div>
  );
};

SplitLayout.Element = Element;

export default SplitLayout;
