import { ReactNode } from "react";
import { Metadata } from "next";
import classNames from "classnames";

import { listMain } from "@/apis";

import SplitLayout from "@/components/templates/SplitLayout";
import TestSidebar from "@/components/organisms/TestSidebar";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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

export default async function PrefetchLayout({
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
          <div className="w-full">
            {/* NOTE SSR */}
            <HydrationBoundary state={dehydrate(queryClient)}>
              <TestSidebar />
            </HydrationBoundary>
          </div>
        </Element>
        <Element>{children}</Element>
      </SplitLayout>
    </section>
  );
}
