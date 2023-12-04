import type { Metadata } from "next";
import classNames from "classnames";

import { inter } from "fonts";
import { TanstackQueryProvider } from "@/lib";
import "./globals.css";

import MainHeader from "@/components/organisms/MainHeader";

export const metadata: Metadata = {
  title: "Home",
  description: "루트 페이지",
  icons: "/images/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackQueryProvider>
          <div className={classNames("flex", "h-full", "w-full", "flex-col")}>
            <MainHeader />
            <div className={classNames("flex", "grow")}>{children}</div>
          </div>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
