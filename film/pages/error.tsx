"use client";
import Link from "next/link";
import RootLayout from "@/app/layout";

export default function NotFound() {
  return (
    <RootLayout>
      <main className="flex h-full flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>Kan ikke finne det du leter etter.</p>
        <Link
          href="index"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Go Back
        </Link>
      </main>
    </RootLayout>
  );
}
