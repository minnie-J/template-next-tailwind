import { ReactNode } from "react";
import { Metadata } from "next";
import classNames from "classnames";

import { listMain } from "@/apis";

import SplitLayout from "@/components/templates/SplitLayout";
import TestSidebar from "@/components/organisms/TestSidebar";

export const metadata: Metadata = {
  title: "Nested Menus",
  description: "중첩 메뉴 여러 개 넣은 테스트 페이지",
};

export default async function NestedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const initMainDatas = await listMain();

  const { Element } = SplitLayout;

  return (
    <section className={classNames("flex", "grow", "bg-white", "text-black")}>
      <SplitLayout>
        <Element width={300}>
          <div className="w-full">
            <TestSidebar initMainDatas={initMainDatas} />
          </div>
        </Element>
        <Element>{children}</Element>
      </SplitLayout>
    </section>
  );
}
