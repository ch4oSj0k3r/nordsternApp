'use client';

import Link from 'next/link';
import Image from 'next/image';
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
import logo from '../../../assets/img/logo.webp';

interface NavItem {
    label: string;
    icon: IconType;
    pathname: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', icon: AiOutlineHome, pathname: '/' },
    { label: 'Spielplan', icon: AiTwotoneCalendar, pathname: '/matchplan' },
    { label: 'Statistik', icon: AiFillTrophy, pathname: '/playerStats' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-base-200 border-r border-white/5 fixed top-0 left-0 z-40">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
                <Image src={logo} alt="logo" width={36} height={36} />
                <div>
                    <p className="text-xs text-base-content/40 uppercase tracking-widest leading-none mb-0.5">
                        Team
                    </p>
                    <h1 className="text-lg font-bold text-primary leading-none tracking-tight">
                        Nordstern
                    </h1>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const active = pathname === item.pathname;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.pathname}
                            href={item.pathname}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                                active
                                    ? 'border-l-2 border-primary bg-primary/10 text-primary pl-[10px]'
                                    : 'border-l-2 border-transparent text-base-content/60 hover:text-base-content hover:bg-white/5 pl-[10px]'
                            }`}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom — Session */}
            <div className="px-3 py-4 border-t border-white/5">
                {session?.user ? (
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-base-content/60 hover:text-base-content hover:bg-white/5 transition-all duration-150 border-l-2 border-transparent pl-[10px]"
                    >
                        <AiOutlineLogout className="h-5 w-5 flex-shrink-0" />
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-base-content/60 hover:text-base-content hover:bg-white/5 transition-all duration-150 border-l-2 border-transparent pl-[10px]"
                    >
                        <AiOutlineLogin className="h-5 w-5 flex-shrink-0" />
                        Login
                    </button>
                )}
            </div>
        </aside>
    );
}
