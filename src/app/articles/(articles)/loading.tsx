import classNames from "classnames";
import React from "react";

const Loading = () => {
  return (
    <div
      className={classNames(
        "flex",
        "flex-grow",
        "h-full",
        "max-h-[38rem]",
        "items-center",
        "justify-center"
      )}
    >
      loading...
    </div>
  );
};

export default Loading;
