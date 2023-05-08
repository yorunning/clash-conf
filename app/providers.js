"use client";
import { useServerInsertedHTML } from "next/navigation";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

export default function Providers({ children }) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });
  return <GeistProvider>{children}</GeistProvider>;
}
