import React, { useState, useEffect } from 'react'

import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { GiCalendar } from 'react-icons/gi'

import GameWidget from '../../components/Widgets/components/GameWidget'
import { activeTeamId } from '../../helpers'

export async function getServerSideProps() {
    const prisma = new PrismaClient()

    const seasons = await prisma.season.findMany()
    const currentSeasonId = seasons[seasons.length - 1].id
    const matchplan = await prisma.matchday.findMany({
        include: { games: { include: { homeTeam: true, awayTeam: true } } },
        where: { seasonId: currentSeasonId },
    })
    const today = new Date().toISOString()
    const nextNordsternGame = await prisma.game.findFirst({
        where: {
            OR: [{ homeTeamId: activeTeamId }, { awayTeamId: activeTeamId }],
            date: { gte: today },
        },
        include: { matchday: true },
        orderBy: { date: 'asc' },
    })

    return {
        props: {
            matchplan,
            currentMatchday: nextNordsternGame?.matchday?.matchday || 1,
        }, // will be passed to the page component as props
    }
}

export default function Matchplan({ matchplan, currentMatchday }) {
    const { data: session } = useSession()
    const [matchday, setMatchday] = useState(currentMatchday)
    const [games, setGames] = useState([])

    useEffect(() => {
        const games = matchplan.find((md) => md.matchday === matchday).games
        setGames(games)
    }, [matchplan, matchday])

    const goCurrent = () => {
        setMatchday(currentMatchday)
    }

    const goPrevious = () => {
        let newMatchday = matchday
        if (matchday === 1) {
            newMatchday = matchplan.length
        } else {
            newMatchday--
        }

        setMatchday(newMatchday)
    }
    const goNext = () => {
        let newMatchday = matchday
        if (matchday === matchplan.length) {
            newMatchday = 1
        } else {
            newMatchday++
        }

        setMatchday(newMatchday)
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="btn-group justify-self-center">
                <button className="btn text-secondary" onClick={goPrevious}>
                    «
                </button>
                <button className="btn text-primary" onClick={goCurrent}>
                    Spieltag {matchday}
                </button>
                <Link href="/api/ical" passHref>
                    <button className="btn text-primary">
                        <GiCalendar className="inline-block mr-2" /> Export
                    </button>
                </Link>
                <button className="btn text-secondary" onClick={goNext}>
                    »
                </button>
            </div>
            {games.map((game) => (
                <GameWidget
                    key={game.id}
                    headline={`Spiel ${game.gamenumber}`}
                    game={game}
                    editable={session && session.user}
                />
            ))}
        </div>
    )
}
