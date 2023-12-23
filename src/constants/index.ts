import { IconIdType } from "@/components/atoms/icon";

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
    name: "Prefetch Example",
    url: "/menus",
    iconId: "nested",
  },
  {
    name: "Suspense Example",
    url: "/articles",
    iconId: "list",
  },
  {
    name: "Temp",
    url: "/temp",
    iconId: "test",
  },
];

export const DETAIL_MENUS: Array<{ name: string; key: string }> = [
  { name: "Detail Menu 1", key: "sub1" },
  { name: "Detail Menu 2", key: "sub2" },
];
