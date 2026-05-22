'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
    AiFillTrophy,
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiTwotoneCalendar,
} from 'react-icons/ai';
import { IconType } from 'react-icons';

interface NavItem {
    label: string;
    icon: IconType;
    pathname: string;
}

const navItems: NavItem[] = [
    { label: 'Home', icon: AiOutlineHome, pathname: '/' },
    { label: 'Spielplan', icon: AiTwotoneCalendar, pathname: '/matchplan' },
    { label: 'Statistik', icon: AiFillTrophy, pathname: '/playerStats' },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around bg-base-200/95 backdrop-blur-md border-t border-white/5 pb-safe">
            {navItems.map((item) => {
                const active = pathname === item.pathname;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.pathname}
                        href={item.pathname}
                        className={`flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium transition-all duration-150 ${
                            active
                                ? 'text-primary'
                                : 'text-base-content/50 hover:text-base-content'
                        }`}
                    >
                        <Icon
                            className={`h-5 w-5 ${
                                active
                                    ? 'drop-shadow-[0_0_6px_rgba(227,110,0,0.8)]'
                                    : ''
                            }`}
                        />
                        {item.label}
                        {active && (
                            <span className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-t-full" />
                        )}
                    </Link>
                );
            })}
            {session?.user ? (
                <button
                    onClick={() => signOut()}
                    className="flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium text-base-content/50 hover:text-base-content transition-all duration-150"
                >
                    <AiOutlineLogout className="h-5 w-5" />
                    Logout
                </button>
            ) : (
                <button
                    onClick={() => signIn()}
                    className="flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium text-base-content/50 hover:text-base-content transition-all duration-150"
                >
                    <AiOutlineLogin className="h-5 w-5" />
                    Login
                </button>
            )}
        </nav>
    );
}
