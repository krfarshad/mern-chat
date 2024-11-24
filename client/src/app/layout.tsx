import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/css/globals.css";
import { AppProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MERN chat application",
  description: "fullstack real time chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
