import { Header } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Our Posts"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex items-center flex-col w-full">
      <Header />
      <main className="max-w-7xl w-full pt-12">{children}</main>
    </section>
  );
}
