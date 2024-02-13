import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Filmer",
//   description: "Nettside for å vise filmer",
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className="">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
