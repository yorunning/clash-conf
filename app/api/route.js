import { redirect } from "next/navigation";
import { generateRawLink } from "../utils";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { target, filename, url } = Object.fromEntries(searchParams.entries());

  redirect(generateRawLink(target, filename, url));
}
