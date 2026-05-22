import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Image from 'next/image';
import logo from '../../../assets/img/logo.webp';
import Menu from '../Menu';

export default function Navbar() {
    return (
        <div className="w-full navbar sticky top-0 z-30 bg-base-100/80 backdrop-blur-md border-b border-base-content/10 px-4">
            <div className="flex-none mr-2">
                <div className="w-10 h-10">
                    <Image src={logo} alt="logo" width={40} height={40} />
                </div>
            </div>
            <div className="flex-1 px-2">
                <h1 className="text-primary font-bold text-xl md:text-2xl tracking-wide">
                    Team Nordstern
                </h1>
            </div>
            <div className="flex-none hidden lg:block">
                <Menu className="menu-horizontal" />
            </div>
            <div className="flex-none lg:hidden">
                <label
                    htmlFor="drawer-navigation"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                >
                    <GiHamburgerMenu className="h-6 w-6" />
                </label>
            </div>
        </div>
    );
}
