import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.scss";
import PageLoader from "./components/PageLoader";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Squadron",
    description: "",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <PageLoader>
                        <Header/>
                        <main>
                            {children}
                        </main>
                        <Footer/>
                    </PageLoader>
                </ThemeProvider>
            </body>
        </html>
    );
}