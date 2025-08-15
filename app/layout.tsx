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

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Form Builder",
    description: "No desciption provided",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>
            <NextTopLoader/>
            <DesignerContextProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
                        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
                            <Logo/>
                            <div className="flex gap-4 items-center">
                                <ThemeSwitcher/>
                                <UserButton afterSignOutUrl="/sign-in"/>
                            </div>
                        </nav>

                        <main className="flex w-full flex-grow">
                            {children}
                        </main>
                    </div>
                    <Toaster/>
                </ThemeProvider>
            </DesignerContextProvider>
            </body>
            </html>
        </ClerkProvider>

    );
}
