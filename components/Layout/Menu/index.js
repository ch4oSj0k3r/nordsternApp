'use client';

import Link from 'next/link';
import {
    AiFillTrophy,
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiTwotoneCalendar,
} from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const Menu = ({ className = '' }) => {
    const pathname = usePathname();
    const { data: session } = useSession();

    const navItems = [
        {
            label: 'Startseite',
            icon: <AiOutlineHome className="h-5 w-5" />,
            pathname: '/',
        },
        {
            label: 'Spielplan',
            icon: <AiTwotoneCalendar className="h-5 w-5" />,
            pathname: '/matchplan',
        },
        {
            label: 'Statistik',
            icon: <AiFillTrophy className="h-5 w-5" />,
            pathname: '/playerStats',
        },
    ];

    if (session && session.user) {
        navItems.push({
            label: 'Logout',
            icon: <AiOutlineLogout className="h-5 w-5" />,
            onClick: () => signOut(),
        });
    } else {
        navItems.push({
            label: 'Login',
            icon: <AiOutlineLogin className="h-5 w-5" />,
            onClick: () => signIn(),
        });
    }

    return (
        <ul className={`menu ${className}`}>
            {navItems.map((item, index) => (
                <li key={`navItem_${index}`}>
                    <Link
                        href={
                            !item.disabled && item.pathname ? item.pathname : ''
                        }
                        passHref
                        className={`flex items-center gap-2 transition-colors ${
                            pathname === item.pathname
                                ? 'text-primary border-b-2 border-primary rounded-none'
                                : 'text-base-content hover:text-primary'
                        }`}
                        onClick={item.onClick}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Menu;
