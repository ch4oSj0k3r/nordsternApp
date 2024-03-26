import React, { useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'

import Widget from '../..'
import RadarChart from '../../../RadarChart'
import StatsButtons from '../../../StatsButtons'
import BarChart from '../../../BarChart'

const PlayerWidget = ({ player, setPlayers, showDiagram, selectedGame }) => {
    const { data: session } = useSession()
    const [open, setOpen] = useState(true)

    const stats = useMemo(() => {
        if (selectedGame && player) {
            return player.playerStats.filter(
                (stat) => stat.gameId === selectedGame
            )
        }
        return player.playerStats || []
    }, [player, selectedGame])

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
                {((session && session.user) || showDiagram) && (
                    <div className="collapse-content">
                        {session && session.user && (
                            <div className="grid mb-4">
                                <StatsButtons
                                    player={player}
                                    setPlayers={setPlayers}
                                    selectedGame={selectedGame}
                                />
                            </div>
                        )}
                        {showDiagram && (
                            <div>
                                <BarChart playerStats={stats} minify />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Widget>
    )
}

export default PlayerWidget
