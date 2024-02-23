import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

import {
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiTwotoneCalendar,
    AiFillTrophy,
} from 'react-icons/ai'

export default function Navigation(props) {
    const router = useRouter()
    const { data: session } = useSession()

    const navItems = [
        {
            label: 'Home',
            icon: <AiOutlineHome className="text-4xl" />,
            pathname: '/',
        },
        {
            label: 'Spielplan',
            icon: <AiTwotoneCalendar className="text-4xl" />,
            pathname: '/matchplan',
        },
        {
            label: 'Stats',
            icon: <AiFillTrophy className="text-4xl" />,
            pathname: '/playerStats',
        },
    ]

    if (session && session.user) {
        navItems.push({
            label: 'Logout',
            icon: <AiOutlineLogout className="text-4xl" />,
            onClick: () => signOut(),
        })
    } else {
        navItems.push({
            label: 'Login',
            icon: <AiOutlineLogin className="text-4xl" />,
            onClick: () => signIn(),
        })
    }

    return (
        <div className="mt-2 md:mt-4 bg-primary border-t-4 border-accent xl:w-1/2">
            <div className="flex">
                {navItems.map((item, index) => {
                    return (
                        <Link
                            key={`navItem_${index}`}
                            href={
                                !item.disabled && item.pathname
                                    ? item.pathname
                                    : ''
                            }
                            passHref
                        >
                            <div
                                className={`
                    flex-1 text-center border-l-2 border-accent transition-colors duration-300 cursor-pointer
                    ${index === 0 ? 'border-l-0' : ''}
                    ${
                        // active
                        router.pathname === item.pathname
                            ? 'bg-accent text-primary'
                            : 'text-accent'
                    }
                    ${
                        // disabled
                        item.disabled
                            ? 'bg-zinc-400 text-zinc-600 cursor-not-allowed'
                            : ''
                    }
                `}
                            >
                                <a onClick={item.onClick}>
                                    <div
                                        className="tooltip tooltip-accent p-4"
                                        data-tip={item.label}
                                    >
                                        {item.icon}
                                    </div>
                                </a>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
