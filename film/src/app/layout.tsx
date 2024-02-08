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
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
