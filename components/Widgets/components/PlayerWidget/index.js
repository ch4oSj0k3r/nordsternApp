import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

import Widget from '../..'
import RadarChart from '../../../RadarChart'
import StatsButtons from '../../../StatsButtons'

const PlayerWidget = ({ player, setPlayers }) => {
    const { data: session } = useSession()
    const [open, setOpen] = useState(true)

    if (!player) return

    return (
        <Widget>
            <div
                tabIndex={0}
                className={`collapse md:collapse-open ${
                    open ? 'collapse-open' : 'collapse-close'
                }`}
            >
                <div
                    className="flex items-center collapse-title cursor-pointer md:cursor-default"
                    onClick={() => setOpen(!open)}
                >
                    <div className="grow">
                        <h2 className="card-title text-nsOrange">{`${player.firstname} ${player.lastname} (${player.playernumber})`}</h2>
                    </div>
                </div>
                <div className="collapse-content">
                    {session && session.user && (
                        <div className="grid mb-4">
                            <StatsButtons
                                player={player}
                                setPlayers={setPlayers}
                            />
                        </div>
                    )}
                    <div>
                        <RadarChart playerStats={player.playerStats} minify />
                    </div>
                </div>
            </div>
        </Widget>
    )
}

export default PlayerWidget
