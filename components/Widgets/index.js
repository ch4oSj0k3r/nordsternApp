import React from 'react'

export default function Widget({children}) {
  return (
    <div className="card sm:card-normal w-full bg-base-100 border">
      <div className="card-body p-2">{children}</div>
    </div>
  )
}
