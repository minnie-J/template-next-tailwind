import type { Metadata } from "next";
import { AntdResistry, TanstackQueryProvider } from "@/lib";
import { pretendard } from "@/public/fonts";
import "./globals.css";

import MainHeader from "@/components/organisms/MainHeader";

export const metadata: Metadata = {
  title: "Home",
  description: "루트 페이지",
  icons: { icon: "/images/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <TanstackQueryProvider>
          <AntdResistry>
            <div className="flex h-full w-full flex-col">
              <MainHeader />
              <div className="flex grow">{children}</div>
            </div>
          </AntdResistry>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
