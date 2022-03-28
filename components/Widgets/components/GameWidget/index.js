import React from 'react'

import {GiHouse, GiCityCar, GiCalendar} from 'react-icons/gi'

import Widget from '../..'

export default function GameWidget({headline, game}) {
  if (!game) {
    return ''
  }

  const date = new Date(game.date)
  const dateString = date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Widget>
      {headline && <h2 className="card-title">{headline}</h2>}
      <div>
        <GiHouse className="inline-block mr-2" />
        {game.homeTeam.name}
      </div>
      <div>
        <GiCityCar className="inline-block mr-2" />
        {game.awayTeam.name}
      </div>
      <div>
        <GiCalendar className="inline-block mr-2" />
        {dateString}
      </div>
    </Widget>
  )
}
