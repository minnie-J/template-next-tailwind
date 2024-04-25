import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";

const Backdrop = ({
  children,
  onClick,
  style,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}) => {
  return (
    <div
      className={classNames(
        "h-full",
        "w-full",
        "flex",
        "items-center",
        "justify-center",
        "fixed",
        "inset-0",
        "bg-black/35",
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Backdrop;
