import { Providers } from "./providers";
import "./globals.scss";

export const metadata = {
  title: "Subscription Converter",
  description: "Quickly convert Clash & Stash configuration files.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
