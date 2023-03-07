import React from 'react'
import {useSession} from 'next-auth/react'

import Widget from '../..'
import RadarChart from '../../../RadarChart'
import StatsButtons from '../../../StatsButtons'

const PlayerWidget = ({player, setPlayers}) => {
  const {data: session} = useSession()

  if (!player) return

  return (
    <Widget>
      <div className="flex items-center">
        <div className="grow">
          <h2 className="card-title text-primary">{`${player.firstname} ${player.lastname} (${player.playernumber})`}</h2>
        </div>
      </div>
      <div>
        {session && session.user && (
          <div className="grid mb-4">
            <StatsButtons player={player} setPlayers={setPlayers} />
          </div>
        )}
        <div>
          <RadarChart playerStats={player.playerStats} minify />
        </div>
      </div>
    </Widget>
  )
}

export default PlayerWidget
