import { ThemeProvider } from "next-themes";
import "./globals.scss";
import PageLoader from "./components/PageLoader";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

export const metadata = {
    title: "Squadron",
    description: "",
};

const RootLayout = ({ children }) => {
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

export default RootLayout;