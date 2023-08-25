import { ReactNode } from "react";
import { Metadata } from "next";

import { listMain } from "@/apis";

import TestSidebar from "@/components/organisms/TestSidebar";
import HorizontalLayout from "@/components/templates/HorizontalLayout";

export const metadata: Metadata = {
  title: "Test",
  description: "Test 페이지",
};

const TestLayout = async ({ children }: { children: ReactNode }) => {
  const initMainDatas = await listMain();

  return (
    <section className="flex grow bg-white text-black">
      <HorizontalLayout>
        <HorizontalLayout.LeftArea width={300}>
          <div className="w-full">
            <TestSidebar initMainDatas={initMainDatas} />
          </div>
        </HorizontalLayout.LeftArea>
        <HorizontalLayout.RightArea>{children}</HorizontalLayout.RightArea>
      </HorizontalLayout>
    </section>
  );
};

export default TestLayout;
