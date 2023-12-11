import { CSSProperties } from "react";
import {
  AiOutlineApartment,
  AiFillExperiment,
  AiOutlineFileUnknown,
  AiFillHome,
  AiOutlineHome,
  AiOutlineLoading,
} from "react-icons/ai";
import { BsListNested, BsListUl } from "react-icons/bs";

export type IconIdType =
  | "unknown"
  | "loading"
  | "home"
  | "test"
  | "tree"
  | "nested"
  | "list";

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
  if (iconId === "nested") return <BsListNested {...props} />;
  if (iconId === "list") return <BsListUl {...props} />;

  return <AiOutlineFileUnknown {...props} />;
};

export default Icon;
