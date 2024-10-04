import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

export const metadata: Metadata = {
  metadataBase: new URL("https://allo.expert"),
  title: "Allo Experts",
  description: "",
  icons: {
    icon: "https://assets-global.website-files.com/6433c5d029c6bb75f3f00bd5/6433c5d029c6bb9127f00c07_gitcoin-fav3.png",
    shortcut:
      "https://assets-global.website-files.com/6433c5d029c6bb75f3f00bd5/6433c5d029c6bb9127f00c07_gitcoin-fav3.png",
    apple:
      "https://assets-global.website-files.com/6433c5d029c6bb75f3f00bd5/6433c5d029c6bb9127f00c07_gitcoin-fav3.png",
  },
};
const mono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${mono.variable} ${sans.variable} font-sans`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
