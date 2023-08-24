import { ReactNode } from "react";
import { Metadata } from "next";

import HorizontalLayout from "@/components/templates/HorizontalLayout";
import TestSidebar from "@/components/organisms/TestSidebar";

export const metadata: Metadata = {
  title: "Test",
  description: "Test 페이지",
};

const TestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex grow bg-white text-black">
      <HorizontalLayout>
        <HorizontalLayout.LeftArea width={300}>
          <div className="w-full">
            <TestSidebar />
          </div>
        </HorizontalLayout.LeftArea>
        <HorizontalLayout.RightArea>{children}</HorizontalLayout.RightArea>
      </HorizontalLayout>
    </section>
  );
};

export default TestLayout;
