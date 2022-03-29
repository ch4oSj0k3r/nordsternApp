import React from 'react'
import Link from 'next/link'

import {PrismaClient} from '@prisma/client'

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const matchplan = await prisma.matchday.findMany({
    include: {games: {include: {homeTeam: true, awayTeam: true}}},
  })

  return {
    props: {matchplan}, // will be passed to the page component as props
  }
}

export default function Matchplan({matchplan}) {
  console.log(matchplan)

  return (
    <div>
      <Link href="/matchplan/1">Matchplan</Link>
    </div>
  )
}
