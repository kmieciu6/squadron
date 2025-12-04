import { ThemeProvider } from "next-themes";
import "./globals.scss";
import PageLoader from "./components/PageLoader";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import {CookiesConsentProvider} from "@/app/context/CookiesConsentContext";

export const metadata = {
    title: "Squadron",
    description: "",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <CookiesConsentProvider>
                        <PageLoader>
                            <Header/>
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

export default RootLayout;