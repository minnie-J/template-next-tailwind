import classNames from "classnames";

const Loading = (style: { maxHeight?: string }) => {
  return (
    <div
      className={classNames(
        "flex",
        "flex-grow",
        "h-full",
        "items-center",
        "justify-center"
      )}
      style={{ ...style }}
    >
      loading...
    </div>
  );
};

export default Loading;
