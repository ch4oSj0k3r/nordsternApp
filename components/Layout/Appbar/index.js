import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import Image from 'next/image'

import logo from '../../../assets/img/logo.png'

export default function Appbar() {
    const [counter, setCounter] = useState(0)

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
                toast.success('Keep DB alive!')
            })
            .catch(() => {
                toast.error('DB is dead!')
            })
    }, [])

    useEffect(() => {
        if (counter === 5) {
            setCounter(0)
            setKeepDbAlive()
        }
    }, [counter, setCounter, setKeepDbAlive])

    return (
        <div className="navbar mb-2 md:mb-4 bg-primary border-b-4 border-accent">
            <div className="flex-1">
                <h1 className="normal-case text-accent text-xl md:text-2xl">
                    Team Nordstern
                </h1>
            </div>
            <div className="flex-none">
                <div className="w-24 md:w-32">
                    <Image
                        src={logo}
                        alt="logo"
                        onClick={() => setCounter(counter + 1)}
                    />
                </div>
            </div>
        </div>
    )
}
