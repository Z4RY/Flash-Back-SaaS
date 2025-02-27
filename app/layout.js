import { Inter, Recursive, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const recursive = Inter({
  subsets: ["latin"],
  display: "swap",
});

import Navbar from "./components/navbar/page";

export const metadata = {
  title: "FlashBack",
  description: "A website for creating flashcards with AI.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
