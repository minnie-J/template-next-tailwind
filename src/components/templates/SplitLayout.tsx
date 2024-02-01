import { CSSProperties, Children, ReactNode } from "react";
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
  className,
  style,
}: {
  children: ReactNode;
  height?: number;
  width?: number;
  className?: string;
  style?: CSSProperties;
}) => {
  const size: CSSProperties = height
    ? { height: `${height}px`, minHeight: `${height}px` }
    : width
      ? { width: `${width}px`, minWidth: `${width}px` }
      : { flexGrow: 1 };

  const styleOverride = Object.assign(size, style);

  return (
    <div
      className={classNames("flex", "h-full", className)}
      style={styleOverride}
    >
      {children}
    </div>
  );
};

SplitLayout.Element = Element;

export default SplitLayout;
