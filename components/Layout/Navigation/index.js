import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {signIn, signOut, useSession} from 'next-auth/react'

import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineLogout,
  AiTwotoneCalendar,
  AiFillTrophy,
} from 'react-icons/ai'

export default function Navigation(props) {
  const router = useRouter()
  const {data: session} = useSession()

  const navItems = [
    {
      label: 'Home',
      icon: <AiOutlineHome className="text-lg md:text-2xl" />,
      pathname: '/',
    },
    {
      label: 'Spielplan',
      icon: <AiTwotoneCalendar className="text-lg md:text-2xl" />,
      pathname: '/matchplan',
    },
  ]

  if (session && session.user) {
    navItems.push({
      label: 'Stats',
      icon: <AiFillTrophy className="text-lg md:text-2xl" />,
      pathname: '/playerStats',
    })
    navItems.push({
      label: 'Logout',
      icon: <AiOutlineLogout className="text-lg md:text-2xl" />,
      onClick: () => signOut(),
    })
  } else {
    navItems.push({
      label: 'Login',
      icon: <AiOutlineLogin className="text-lg md:text-2xl" />,
      onClick: () => signIn(),
    })
  }

  return (
    <ul className="menu menu-horizontal bg-base-100 rounded-box">
      {navItems.map((item, index) => {
        return (
          <li
            key={`navItem_${index}`}
            className={item.disabled ? 'disabled' : ''}
          >
            <Link href={!item.disabled && item.pathname ? item.pathname : ''}>
              <a
                onClick={item.onClick}
                className={`border-2 ${
                  router.pathname === item.pathname ? 'active' : ''
                } ${index === 0 ? 'border-l-2' : 'border-l-0'}`}
              >
                <div className="tooltip tooltip-accent" data-tip={item.label}>
                  {item.icon}
                </div>
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
