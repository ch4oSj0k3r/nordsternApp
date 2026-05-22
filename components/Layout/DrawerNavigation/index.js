'use client';

import Navbar from '../Navbar';
import Menu from '../Menu';
import { usePathname } from 'next/navigation';
import { createRef, useEffect } from 'react';

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
            <div className="drawer-side">
                <label
                    htmlFor="drawer-navigation"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <div className="w-80 min-h-full bg-base-200">
                    <div className="border-b-4 p-4">
                        <h1 className="text-xl text-nsOrange font-bold">
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
