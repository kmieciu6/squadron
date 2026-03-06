import { ThemeProvider } from "next-themes";
import "./globals.scss";
import PageLoader from "./components/PageLoader";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import {CookiesConsentProvider} from "@/app/context/CookiesConsentContext";
import CookieBanner from "@/app/components/CookieBanner";
import {Outfit} from "next/font/google";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Squadron",
  description: "",
};

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout ({ children }: Readonly<{children: React.ReactNode;}> ) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={outfit.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <CookiesConsentProvider>
                        <PageLoader>
                            <Header/>
                            <CookieBanner/>
                            <main>
                                {children}
                            </main>
                            <Footer/>
                        </PageLoader>
                    </CookiesConsentProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}