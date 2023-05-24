import { redirect } from "next/navigation";

import { generateRawLink } from "@/lib/utils";

export async function GET(request) {
  const { type, filename, url } = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  );

  // console.log(generateRawLink(type, filename, url));
  redirect(generateRawLink(type, filename, url));
}
