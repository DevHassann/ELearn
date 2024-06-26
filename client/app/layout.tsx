"use client";

import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "../functions/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "../functions/providers";
import { SessionProvider } from "next-auth/react";
import LoaderCondition from "../functions/loader-condition";

import "@/styles/globals.css";
import "@/styles/partials.css";
import "@/styles/animations.css";

// FONTS SPECIFICATIONS
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-400`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <LoaderCondition>{children}</LoaderCondition>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
