"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logo from "@/components/Logo";

interface NavbarWrapperProps {
    children: React.ReactNode;
}

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
    const pathname = usePathname();
    
    // Hide navbar on Clerk authentication pages
    const isClerkPage = pathname.startsWith("/sign-in") || 
                       pathname.startsWith("/sign-up") || 
                       pathname.startsWith("/user");
    
    if (isClerkPage) {
        return <main className="flex w-full flex-grow">{children}</main>;
    }
    
    return (
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
    );
}
