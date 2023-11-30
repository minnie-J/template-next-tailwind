import type { Metadata } from "next";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { TanstackQueryProvider } from "@/lib";
import { inter } from "fonts";
import "./globals.css";

import MainHeader from "@/components/organisms/MainHeader";

export const metadata: Metadata = {
  title: "Home",
  description: "루트 페이지",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
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
