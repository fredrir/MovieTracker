import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";
import Footer from "./ui/footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Filmer",
//   description: "Nettside for å vise filmer",
// };

<Link href="/not-existing-route">Not Found</Link>


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className="">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
