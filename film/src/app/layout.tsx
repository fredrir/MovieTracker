"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";
import Footer from "./ui/footer";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import path from "path";

const inter = Inter({ subsets: ["latin"] });

<Link href="/not-existing-route">Not Found</Link>;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname != "/login" && localStorage.getItem("access_token") == null) {
      router.push("/login");
    }
  }, []);
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
