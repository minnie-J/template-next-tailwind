import { ReactNode } from "react";
import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import classNames from "classnames";

import { listMain } from "@/api/menus";

import SplitLayout from "@/components/templates/split-layout";

import Sidebar from "./sidebar";

export const metadata: Metadata = {
  title: "Nested Menus(Prefetch)",
  description: "중첩 메뉴 여러 개 넣은 테스트 페이지",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/nested-black.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/nested-white.svg",
      },
    ],
  },
};

export default async function MenusLayout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  // NOTE data prefetch
  await queryClient.prefetchQuery({
    queryKey: [listMain.name],
    queryFn: listMain,
  });

  const { Element } = SplitLayout;

  return (
    <section className={classNames("flex", "grow", "bg-white", "text-black")}>
      <SplitLayout>
        <Element width={300}>
          {/* NOTE SSR */}
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Sidebar />
          </HydrationBoundary>
        </Element>
        <Element>{children}</Element>
      </SplitLayout>
    </section>
  );
}
