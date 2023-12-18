"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link className="text-black" href={'/auth/login'}>
        Login
      </Link>
    </main>
  )
}
