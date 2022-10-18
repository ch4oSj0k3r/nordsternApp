export const getTable = games => {
  let table = []
  games.forEach(game => {
    let homePoints = 0
    let awayPoints = 0

    if (game.homePoints && game.awayPoints) {
      if (game.homePoints > game.awayPoints) {
        if (game.awayPoints < 10) {
          homePoints = 3
        } else {
          homePoints = 2
          awayPoints = 1
        }
      } else {
        if (game.homePoints < 10) {
          awayPoints = 3
        } else {
          awayPoints = 2
          homePoints = 1
        }
      }
    }
    let homeIndex = table.findIndex(team => team.id === game.homeTeamId)
    if (homeIndex != -1) {
      let home = table[homeIndex]
      home.points += homePoints
      ;(home.games += homePoints || awayPoints ? 1 : 0),
        (home.wins += homePoints >= 2 ? 1 : 0)
      home.losses += awayPoints >= 2 ? 1 : 0
      home.winGames += game.homePoints
      home.lossGames += game.awayPoints
      home.diffGames += game.homePoints - game.awayPoints
    } else {
      table.push({
        id: game.homeTeamId,
        name: game.homeTeam.name,
        games: homePoints || awayPoints ? 1 : 0,
        points: homePoints,
        wins: homePoints >= 2 ? 1 : 0,
        losses: awayPoints >= 2 ? 1 : 0,
        winGames: game.homePoints,
        lossGames: game.awayPoints,
        diffGames: game.homePoints - game.awayPoints,
      })
    }
    let awayIndex = table.findIndex(team => team.id === game.awayTeamId)
    if (awayIndex != -1) {
      let away = table[awayIndex]
      away.points += awayPoints
      ;(away.games += homePoints || awayPoints ? 1 : 0),
        (away.wins += awayPoints >= 2 ? 1 : 0)
      away.losses += homePoints >= 2 ? 1 : 0
      away.winGames += game.awayPoints
      away.lossGames += game.homePoints
      away.diffGames += game.awayPoints - game.homePoints
    } else {
      table.push({
        id: game.awayTeamId,
        name: game.awayTeam.name,
        games: homePoints || awayPoints ? 1 : 0,
        points: awayPoints,
        wins: awayPoints >= 2 ? 1 : 0,
        losses: homePoints >= 2 ? 1 : 0,
        winGames: game.awayPoints,
        lossGames: game.homePoints,
        diffGames: game.awayPoints - game.homePoints,
      })
    }
  })

  table.sort((i, j) => {
    if (i.points > j.points) {
      return -1
    }
    if (i.points < j.points) {
      return 1
    }
    if (i.games > j.games) {
      return -1
    }
    if (i.games < j.games) {
      return 1
    }
    if (i.diffGames < j.diffGames) {
      return 1
    }
    if (i.diffGames > j.diffGames) {
      return -1
    }
    return i.winGames > j.winGames ? -1 : 1
  })

  table = table.map((team, index) => ({place: index + 1, ...team}))

  return table
}

export const addStats = data => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/playerStats`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
}

export const updateGame = (gameId, data) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/${gameId}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
}
