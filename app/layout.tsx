import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "../assets/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import Provider from "./Provider";
import QueryProvider from "./QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of PDP project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <QueryProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
