"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline, GeistProvider } from "@geist-ui/core";

export default function Providers({ children }) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });
  return <GeistProvider>{children}</GeistProvider>;
}
