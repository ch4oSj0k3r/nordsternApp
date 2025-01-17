import React, { useMemo, useState } from 'react'
import { PrismaClient } from '@prisma/client'

import { activeTeamId } from '../../helpers'
import PlayerWidget from '../../components/Widgets/components/PlayerWidget'

export async function getServerSideProps() {
    const prisma = new PrismaClient()

    const seasons = await prisma.season.findMany()
    const currentSeasonId = seasons[seasons.length - 1].id

    const initPlayers = await prisma.player.findMany({
        where: {
            teamId: activeTeamId,
            active: true,
        },
        include: {
            playerStats: {
                include: {
                    game: {
                        include: {
                            matchday: true,
                        },
                    },
                },
            },
        },
    })

    const nordsternGames = await prisma.game.findMany({
        where: {
            OR: [{ homeTeamId: activeTeamId }, { awayTeamId: activeTeamId }],
            AND: [{ matchday: { is: { seasonId: currentSeasonId } } }],
        },
        include: { homeTeam: true, awayTeam: true, matchday: true },
    })

    return {
        props: { currentSeasonId, seasons, initPlayers, nordsternGames }, // will be passed to the page component as props
    }
}

export default function PlayerStats({
    currentSeasonId,
    seasons,
    initPlayers,
    nordsternGames,
}) {
    const [players, setPlayers] = useState(initPlayers)
    const [selectedSeason, setSelectedSeason] = useState(currentSeasonId)
    const [hiddenPlayers, setHiddenPlayers] = useState([])
    const [showDiagram, setShowDiagram] = useState(true)
    const [selectedGame, setSelectedGame] = useState(null)

    const visiblePlayers = useMemo(() => {
        return players.filter((player) => !hiddenPlayers.includes(player.id))
    }, [hiddenPlayers, players])

    const playerOptions = useMemo(() => {
        return players.map((player) => (
            <li key={player.id}>
                <a className="flex">
                    <div className="flex-1">
                        {player.firstname} {player.lastname}
                    </div>
                    <div className="flex-none">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={!hiddenPlayers.includes(player.id)}
                            onChange={() => togglePlayer(player.id)}
                        />
                    </div>
                </a>
            </li>
        ))
    }, [hiddenPlayers, players])

    const gameOptions = useMemo(() => {
        return nordsternGames.map((game) => {
            // Determine the opponent based on which team is not the active team
            const opponentName =
                game.homeTeam.id !== activeTeamId
                    ? game.homeTeam.name
                    : game.awayTeam.name
            // Return the <option> element for each game
            return (
                <option key={game.id} value={game.id}>
                    {opponentName}
                </option>
            )
        })
    }, [nordsternGames])

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

    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <select
                        className="select select-bordered border-nsOrange w-full max-w-xs focus:outline-none focus:border-nsOrange"
                        value={selectedSeason}
                        onChange={(e) =>
                            setSelectedSeason(parseInt(e.target.value))
                        }
                    >
                        {seasons.map((season) => (
                            <option key={season.id} value={season.id}>
                                {season.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select select-bordered border-nsOrange w-full max-w-xs focus:outline-none focus:border-nsOrange"
                        value={selectedGame}
                        onChange={(e) =>
                            setSelectedGame(parseInt(e.target.value))
                        }
                    >
                        <option value={null}>Gesamt</option>
                        {gameOptions}
                    </select>
                </div>
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
                        {playerOptions}
                        <hr />
                        <li>
                            <a className="flex">
                                <div className="flex-1">Diagramm anzeigen</div>
                                <div className="flex-none">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={showDiagram}
                                        onChange={() =>
                                            setShowDiagram(!showDiagram)
                                        }
                                    />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visiblePlayers.map((player) => {
                    return (
                        <PlayerWidget
                            key={player.id}
                            player={player}
                            selectedSeason={selectedSeason}
                            setPlayers={setPlayers}
                            showDiagram={showDiagram}
                            selectedGame={selectedGame}
                        />
                    )
                })}
            </div>
        </div>
    )
}
