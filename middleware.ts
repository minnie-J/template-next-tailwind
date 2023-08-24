import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/test")) {
    const response = await fetch("http://localhost:4000/mainDatas").then(
      (res) => res.json(),
    );

    const id = response[2]?.id;

    if (id != null)
      return NextResponse.redirect(new URL(`/test/${id}`, request.url));
  }
}

export const config = {
  matcher: "/test/:id",
};
