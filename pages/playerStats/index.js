import React, {useCallback, useState} from 'react'
import Link from 'next/link'
import {PrismaClient} from '@prisma/client'

import Table from '../../components/Table'
import {activeTeamId, addStats} from '../../helpers'
import PlayerWidget from '../../components/Widgets/components/PlayerWidget'

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const initPlayers = await prisma.player.findMany({
    where: {teamId: activeTeamId, active: true},
    include: {playerStats: true},
  })

  return {
    props: {initPlayers}, // will be passed to the page component as props
  }
}

export default function PlayerStats({initPlayers}) {
  const [players, setPlayers] = useState(initPlayers)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {players.map(player => {
        return (
          <PlayerWidget
            key={player.id}
            player={player}
            setPlayers={setPlayers}
          />
        )
      })}
    </div>
  )
}
