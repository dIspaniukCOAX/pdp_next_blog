import { Header } from "@/components";
import type { Metadata } from "next";
import styles from "@/assets/styles/pages/auth.module.scss";

export const metadata: Metadata = {
  title: "Auth – Sign In",
  description: "Auth of PDP project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <main className={styles['auth__wrapper']}>
        {children}
      </main>
    </section>
  );
}
