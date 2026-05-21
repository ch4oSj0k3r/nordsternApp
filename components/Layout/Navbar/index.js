import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import Image from 'next/image';

import logo from '../../../assets/img/logo.png';
import Menu from '../Menu';

export default function Navbar() {
    return (
        <div className="w-full navbar border-b-4 mb-2 md:mb-4">
            <div className="flex-none hidden lg:block">
                <div className="w-24 md:w-32">
                    <Image src={logo} alt="logo" />
                </div>
            </div>
            <div className="flex-1 px-2 mx-2">
                <h1 className="text-nsOrange font-bold text-xl md:text-2xl">
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
