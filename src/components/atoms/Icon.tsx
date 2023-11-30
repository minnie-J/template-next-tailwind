import {
  AiOutlineApartment,
  AiFillExperiment,
  AiOutlineFileUnknown,
  AiFillHome,
  AiOutlineHome,
  AiOutlineLoading,
} from "react-icons/ai";
import { CSSProperties } from "react";

export type IconIdType = "loading" | "home" | "test" | "tree" | "unknown";

const Icon = ({
  iconId = "unknown",
  type = "filled",
  ...props
}: {
  iconId: IconIdType;
  type?: "outlined" | "filled";
  spin?: boolean;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) => {
  if (iconId === "home")
    return type === "outlined" ? (
      <AiOutlineHome {...props} />
    ) : (
      <AiFillHome {...props} />
    );

  if (iconId === "test") return <AiFillExperiment {...props} />;
  if (iconId === "loading") return <AiOutlineLoading {...props} />;
  if (iconId === "tree") return <AiOutlineApartment {...props} />;

  return <AiOutlineFileUnknown {...props} />;
};

export default Icon;
