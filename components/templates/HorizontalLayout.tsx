import { Children, ReactElement, ReactNode } from "react";

const HorizontalLayout = ({ children }: { children: Array<ReactNode> }) => {
  const el = Children.toArray(children);
  return <div className="flex grow overflow-hidden">{...el}</div>;
};

const Element = ({
  children,
  width,
}: {
  children: ReactNode;
  width?: number;
}) => {
  return (
    <div
      className="flex h-full"
      style={
        width
          ? { width: `${width}px`, minWidth: `${width}px` }
          : { flexGrow: 1 }
      }
    >
      {children}
    </div>
  );
};

HorizontalLayout.LeftArea = Element;
HorizontalLayout.RightArea = Element;

export default HorizontalLayout;
