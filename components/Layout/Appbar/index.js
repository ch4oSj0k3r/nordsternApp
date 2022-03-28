import React from 'react'

import Image from 'next/image'

import logo from '../../../assets/img/logo.png'

export default function Appbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="normal-case text-xl md:text-2xl">Team Nordstern</h1>
      </div>
      <div className="flex-none">
        <label className="avatar">
          <div className="w-20 md:w-24 rounded-full">
            <Image src={logo} alt="logo" />
          </div>
        </label>
      </div>
    </div>
  )
}
