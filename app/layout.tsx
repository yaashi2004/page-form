import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import {ThemeProvider} from "@/components/providers/ThemeProvider";
import {Toaster} from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/DesignerContext";
import NextTopLoader from "nextjs-toploader";
import {UserButton} from "@clerk/nextjs";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logo from "@/components/Logo";
import NavbarWrapper from "@/components/NavbarWrapper";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Form Builder",
    description: "Create, share, and collect responses from beautiful forms",
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/application.png', type: 'image/png', sizes: '32x32' },
            { url: '/application.png', type: 'image/png', sizes: '16x16' },
        ],
        shortcut: '/favicon.svg',
        apple: '/application.png',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="icon" type="image/png" sizes="32x32" href="/application.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/application.png" />
                <link rel="shortcut icon" href="/favicon.svg" />
                <link rel="apple-touch-icon" href="/application.png" />
            </head>
            <body className={inter.className}>
            <NextTopLoader/>
            <DesignerContextProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavbarWrapper>
                        {children}
                    </NavbarWrapper>
                    <Toaster/>
                </ThemeProvider>
            </DesignerContextProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
