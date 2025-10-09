import { Provider } from "@/components";
import CustomThemeProvider from "@/components/theme/CustomThemeProvider";
import "@/styles/globals.css";
import { ReactNode } from "react";
import { CurrencyProvider } from "@/context/CurrencyProvider";
import { TopBarProvider } from "@/context/TopBarContext";
import AdvancedCookieBanner from "@/components/AdvancedCookieBanner";
import AppLayout from "@/components/AppLayout"; // Import the new client component

// Metadata can now be correctly exported from this Server Component
export const metadata = {
    title: "uCars.pl",
    description: "Nowoczesny system licytacji IAAI, CoPart - Kupuj samochody online z łatwością",
    icons: {
        icon: [
            { url: '/favicon/favicon.ico', type: 'image/x-icon' },
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/favicon/apple-touch-icon.png', type: 'image/png' },
        ],
    },
    manifest: '/favicon/site.webmanifest',
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
                                <AppLayout>{children}</AppLayout>
                            </CustomThemeProvider>
                        </TopBarProvider>
                    </CurrencyProvider>
                    <AdvancedCookieBanner />
                </body>
            </html>
        </Provider>
    );
}