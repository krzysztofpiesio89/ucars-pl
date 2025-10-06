import { Footer, Navbar, Provider } from "@/components";
import CustomThemeProvider from "@/components/theme/CustomThemeProvider";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { CurrencyProvider } from "@/context/CurrencyProvider";
import { TopBarProvider } from "@/context/TopBarContext";
import TopBar from "@/components/TopBar";
import AdvancedCookieBanner from "@/components/AdvancedCookieBanner";

export const metadata = {
    title: "uCars.pl",
    description: "Nowoczesny system licytacji IAAI, CoPart - Kupuj samochody online z łatwością",
};

export default function RootLayout({
    children,
    session,
}: {
    children: ReactNode;
    session: any;
}) {
    return (
        <Provider session={session}>
            <html lang="en">
                <body className="app bg-slate-50 dark:bg-[#0b1120]">
                    <CurrencyProvider>
                        <TopBarProvider>
                            <CustomThemeProvider>
                                {/* --- POPRAWKA --- */}
                                <header className="sticky top-0 z-50">
                                    {/* Poprawiono kolejność */}
                                    
                                    <Navbar />
                                    <TopBar />
                                </header>
                                
                                {/* Usunęliśmy stąd MainContent, teraz 'children' to bezpośrednio zawartość strony */}
                                {children}
                                
                                <Footer />
                                <Toaster position="top-left" reverseOrder={false} />
                            </CustomThemeProvider>
                        </TopBarProvider>
                    </CurrencyProvider>
                    <AdvancedCookieBanner />
                </body>
            </html>
        </Provider>
    );
}