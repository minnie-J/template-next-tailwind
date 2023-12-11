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
    name: "Prefetch Example",
    url: "/prefetch",
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
