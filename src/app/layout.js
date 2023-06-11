import Providers from "./providers";
import siteinfo from "./siteinfo.json";

import "@/styles/globals.scss";

export const metadata = {
  title: siteinfo.title,
  description: siteinfo.description,
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
