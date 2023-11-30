import { IconIdType } from "@/components/atoms/Icon";

export const MAIN_MENUS: Array<{
  name: string;
  url: string;
  iconId: IconIdType;
}> = [
  {
    name: "Home",
    url: "/",
    iconId: "home",
  },
  {
    name: "Test",
    url: "/test",
    iconId: "test",
  },
  {
    name: "Tree",
    url: "/tree",
    iconId: "tree",
  },
];

export const DETAIL_MENUS: Array<{ name: string; key: string }> = [
  { name: "Detail Menu 1", key: "sub1" },
  { name: "Detail Menu 2", key: "sub2" },
];
