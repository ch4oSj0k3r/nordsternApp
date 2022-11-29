import React, {useState, useEffect} from 'react'

import {PrismaClient} from '@prisma/client'
import GameWidget from '../../components/Widgets/components/GameWidget'

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const seasons = await prisma.season.findMany()
  const currentSeasonId = seasons[seasons.length - 1].id
  const matchplan = await prisma.matchday.findMany({
    include: {games: {include: {homeTeam: true, awayTeam: true}}},
    where: {seasonId: currentSeasonId},
  })
  const today = new Date()
  const nextNordsternGame = await prisma.game.findFirst({
    where: {OR: [{homeTeamId: 4}, {awayTeamId: 4}], date: {gte: today}},
    include: {matchday: true},
    orderBy: {date: 'asc'},
  })

  return {
    props: {matchplan, currentMatchday: nextNordsternGame?.matchday?.matchday || 1}, // will be passed to the page component as props
  }
}

export default function Matchplan({matchplan, currentMatchday}) {
  const [matchday, setMatchday] = useState(currentMatchday)
  const [games, setGames] = useState([])

  useEffect(() => {
    const games = matchplan.find(md => md.matchday === matchday).games
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
        <button className="btn text-secondary" onClick={goCurrent}>
          Spieltag {matchday}
        </button>
        <button className="btn text-secondary" onClick={goNext}>
          »
        </button>
      </div>
      {games.map(game => (
        <GameWidget
          key={game.id}
          headline={`Spiel ${game.gamenumber}`}
          game={game}
          editable
        />
      ))}
    </div>
  )
}
