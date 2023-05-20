import { redirect } from "next/navigation";

import { generateRawLink } from "@/lib/utils";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { type, filename, url } = Object.fromEntries(searchParams.entries());

  // console.log(generateRawLink(type, filename, url));
  redirect(generateRawLink(type, filename, url));
}
