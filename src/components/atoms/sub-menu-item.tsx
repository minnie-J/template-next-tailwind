import classNames from "classnames";

const SubMenuItem = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={classNames(
        "h-full",
        "flex",
        "items-center",
        "justify-center",
        "px-4",
        "cursor-pointer",
        {
          "bg-white": isActive,
          "font-semibold": isActive,
          "text-black": isActive,
          "border-t": isActive,
          "border-x": isActive,
        },
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SubMenuItem;
