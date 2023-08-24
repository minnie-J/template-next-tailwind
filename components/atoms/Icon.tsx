import {
  ApartmentOutlined,
  ExperimentFilled,
  FileUnknownOutlined,
  HomeFilled,
  HomeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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
      <HomeOutlined {...props} />
    ) : (
      <HomeFilled {...props} />
    );

  if (iconId === "test") return <ExperimentFilled {...props} />;
  if (iconId === "loading") return <LoadingOutlined {...props} />;
  if (iconId === "tree") return <ApartmentOutlined {...props} />;

  return <FileUnknownOutlined {...props} />;
};

export default Icon;
