import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';

import Image from 'next/image';

import logo from '../../../assets/img/logo.png';
import Menu from '../Menu';

export default function Navbar() {
    const [counter, setCounter] = useState(0);

    const setKeepDbAlive = useCallback(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/keepDbAlive`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(() => {
                toast.success('Keep DB alive!');
            })
            .catch(() => {
                toast.error('DB is dead!');
            });
    }, []);

    useEffect(() => {
        if (counter === 5) {
            setCounter(0);
            setKeepDbAlive();
        }
    }, [counter, setCounter, setKeepDbAlive]);

    return (
        <div className="w-full navbar border-b-4 mb-2 md:mb-4">
            <div className="flex-none hidden lg:block">
                <div className="w-24 md:w-32">
                    <Image
                        src={logo}
                        alt="logo"
                        onClick={() => setCounter(counter + 1)}
                    />
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
