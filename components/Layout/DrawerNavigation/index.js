'use client';

import Navbar from '../Navbar';
import Menu from '../Menu';
import { usePathname } from 'next/navigation';
import { createRef, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../assets/img/logo.webp';

const DrawerNavigation = ({ children }) => {
    const pathname = usePathname();
    const navigationToggler = createRef();

    useEffect(() => {
        if (navigationToggler.current.checked) {
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
                <Navbar />
                {children}
            </div>
            <div className="drawer-side z-40">
                <label
                    htmlFor="drawer-navigation"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <div className="w-80 min-h-full bg-base-200">
                    <div className="flex items-center gap-3 border-b border-base-content/10 p-4">
                        <Image src={logo} alt="logo" width={36} height={36} />
                        <h1 className="text-xl text-primary font-bold tracking-wide">
                            Team Nordstern
                        </h1>
                    </div>
                    <Menu />
                </div>
            </div>
        </div>
    );
};

export default DrawerNavigation;
