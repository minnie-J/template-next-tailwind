import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { listMain } from "./src/apis";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/prefetch")) {
    const response = await listMain();

    const id = response?.length != null ? response[0]?.id : undefined;

    if (id != null)
      return NextResponse.redirect(new URL(`/prefetch/${id}`, request.url));
  }
}

export const config = {
  matcher: "/prefetch/:id",
};
