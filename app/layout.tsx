import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LensLoop — find the used camera kit for the moment",
  description: "A fictional outcome-first camera gear recommendation prototype.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
