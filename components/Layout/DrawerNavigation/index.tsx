'use client';

import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
    AiFillTrophy,
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiTwotoneCalendar,
} from 'react-icons/ai';
import logo from '../../../assets/img/logo.webp';
import MobileHeader from '../MobileHeader';

const navItems = [
    { label: 'Dashboard', icon: AiOutlineHome, pathname: '/' },
    { label: 'Spielplan', icon: AiTwotoneCalendar, pathname: '/matchplan' },
    { label: 'Statistik', icon: AiFillTrophy, pathname: '/playerStats' },
];

const DrawerNavigation = ({ children }) => {
    const pathname = usePathname();
    const navigationToggler = useRef(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (navigationToggler.current?.checked) {
            navigationToggler.current.click();
        }
    }, [navigationToggler, pathname]);

    return (
        <div className="drawer">
            <input
                ref={navigationToggler}
                id="drawer-navigation"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col">
                <MobileHeader />
                {children}
            </div>
            <div className="drawer-side z-50">
                <label
                    htmlFor="drawer-navigation"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <aside className="w-72 min-h-full bg-base-200 flex flex-col">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
                        <Image src={logo} alt="logo" width={32} height={32} />
                        <div>
                            <p className="text-xs text-base-content/40 uppercase tracking-widest leading-none mb-0.5">
                                Team
                            </p>
                            <h1 className="text-base font-bold text-primary leading-none tracking-tight">
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
                    {/* Session */}
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
            </div>
        </div>
    );
};

export default DrawerNavigation;
