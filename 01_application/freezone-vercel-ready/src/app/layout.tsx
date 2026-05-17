import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "FreeZone Demo", description: "Operational compliance, verifiable reputation and cross-border payment unlock flow." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
