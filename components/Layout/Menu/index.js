import Link from 'next/link';
import {
    AiFillTrophy,
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiTwotoneCalendar,
} from 'react-icons/ai';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

const Menu = ({ className = '' }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const navItems = [
        {
            label: 'Startseite',
            icon: <AiOutlineHome className="text-4xl" />,
            pathname: '/',
        },
        {
            label: 'Spielplan',
            icon: <AiTwotoneCalendar className="text-4xl" />,
            pathname: '/matchplan',
        },
        {
            label: 'Statistik',
            icon: <AiFillTrophy className="text-4xl" />,
            pathname: '/playerStats',
        },
    ];

    if (session && session.user) {
        navItems.push({
            label: `Logout`,
            icon: <AiOutlineLogout className="text-4xl" />,
            onClick: () => signOut(),
        });
    } else {
        navItems.push({
            label: 'Login',
            icon: <AiOutlineLogin className="text-4xl" />,
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
                        className={`${
                            router.pathname === item.pathname
                                ? 'text-nsOrange'
                                : 'hover:text-nsOrange'
                        }`}
                        onClick={item.onClick}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Menu;
