import React, { useMemo, useState } from 'react'
import { PrismaClient } from '@prisma/client'

import { activeTeamId } from '../../helpers'
import PlayerWidget from '../../components/Widgets/components/PlayerWidget'

export async function getServerSideProps() {
    const prisma = new PrismaClient()

    const initPlayers = await prisma.player.findMany({
        where: { teamId: activeTeamId, active: true },
        include: { playerStats: true },
    })

    return {
        props: { initPlayers }, // will be passed to the page component as props
    }
}

export default function PlayerStats({ initPlayers }) {
    const [players, setPlayers] = useState(initPlayers)
    const [hiddenPlayers, setHiddenPlayers] = useState([])
    const [showDiagram, setShowDiagram] = useState(true)

    const togglePlayer = (id) => {
        setHiddenPlayers((prevHiddenPlayers) => {
            const hiddenIndex = prevHiddenPlayers.indexOf(id)
            let newHiddenPlayers
            if (hiddenIndex > -1) {
                newHiddenPlayers = prevHiddenPlayers.filter(
                    (playerId) => playerId !== id
                )
            } else {
                newHiddenPlayers = [...prevHiddenPlayers, id]
            }
            return newHiddenPlayers
        })
    }

    const visiblePlayers = useMemo(
        () => players.filter((player) => !hiddenPlayers.includes(player.id)),
        [hiddenPlayers, players]
    )

    return (
        <div className="grid gap-4">
            <div className="dropdown dropdown-end justify-self-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-link m-1 cursor-pointer text-nsRed no-underline"
                >
                    Filter
                </div>
                <ul
                    tabIndex={0}
                    className="border dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    {players.map((player) => (
                        <li key={player.id}>
                            <a className="flex">
                                <div className="flex-1">
                                    {player.firstname} {player.lastname}
                                </div>
                                <div className="flex-none">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={
                                            !hiddenPlayers.includes(player.id)
                                        }
                                        onClick={() => togglePlayer(player.id)}
                                    />
                                </div>
                            </a>
                        </li>
                    ))}
                    <hr />
                    <li>
                        <a className="flex">
                            <div className="flex-1">Diagramm anzeigen</div>
                            <div className="flex-none">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={showDiagram}
                                    onClick={() => setShowDiagram(!showDiagram)}
                                />
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visiblePlayers.map((player) => {
                    return (
                        <PlayerWidget
                            key={player.id}
                            player={player}
                            setPlayers={setPlayers}
                            showDiagram={showDiagram}
                        />
                    )
                })}
            </div>
        </div>
    )
}
