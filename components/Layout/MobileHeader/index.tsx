'use client';

import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../../assets/img/logo.webp';

export default function MobileHeader() {
    return (
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-base-200/90 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-2.5">
                <Image src={logo} alt="logo" width={28} height={28} />
                <span className="text-base font-bold text-primary tracking-tight">
                    Nordstern
                </span>
            </div>
            <label
                htmlFor="drawer-navigation"
                aria-label="open sidebar"
                className="btn btn-ghost btn-sm btn-square"
            >
                <GiHamburgerMenu className="h-5 w-5" />
            </label>
        </header>
    );
}
