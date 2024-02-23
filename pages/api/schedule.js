// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/prisma'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const seasons = await prisma.season.findMany()
                const currentSeasonId = seasons[seasons.length - 1].id
                const schedule = await prisma.game.findMany({
                    include: { homeTeam: true, awayTeam: true, matchday: true },
                    where: { matchday: { is: { seasonId: currentSeasonId } } },
                })
                res.status(200).json(schedule)
            } catch (e) {
                console.error('Request error', e)
                res.status(500).json({ error: 'Error fetching posts' })
            }
            break
        case 'POST':
            try {
                const schedule = req.body
                const seasons = await prisma.season.findMany()
                const currentSeasonId = seasons[seasons.length - 1].id
                let games = []

                for (let i = 0; i < schedule.length; i++) {
                    const match = schedule[i]

                    const dateSplit = match[4].split('.')
                    const d = new Date(
                        `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]} ${match[5]}`
                    )
                    const date = d.toISOString()

                    const matchday = await checkMatchday(
                        match[0],
                        currentSeasonId
                    )
                    const gamenumber = match[1]
                    const homeId = await checkTeam(match[2], currentSeasonId)
                    const awayId = await checkTeam(match[3], currentSeasonId)
                    const homePoints = match[6]
                    const awayPoints = match[7]

                    const game = await checkGame(
                        matchday,
                        gamenumber,
                        homeId,
                        awayId,
                        date,
                        homePoints,
                        awayPoints
                    )

                    games.push(game)
                }

                console.log('Import Done!!')

                res.status(200).json(games)
            } catch (e) {
                console.error('Request error', e)
                res.status(500).json({ error: 'Error fetching posts' })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
    }
}

const checkTeam = async (teamName, seasonId) => {
    let team = await prisma.team.findFirst({
        where: { name: teamName, seasons: { some: { id: seasonId } } },
    })

    // Wenn das Team nicht in Kombination mit der angegeben Saison gefunden
    // wurde, wird geguckt ob das Team generell in der DB vorhanden ist
    if (!team) {
        team = await prisma.team.findFirst({
            where: { name: teamName },
        })

        // Wenn das Team nicht in der DB vorhanden ist, wird es neu angelegt oder
        // mit der neuen Sasion verknüpft
        if (!team) {
            team = await prisma.team.create({
                data: {
                    name: teamName,
                    seasons: {
                        connect: {
                            id: seasonId,
                        },
                    },
                },
            })
        } else {
            team = await prisma.team.update({
                where: { name: teamName },
                data: {
                    seasons: {
                        connect: {
                            id: seasonId,
                        },
                    },
                },
            })
        }
    }

    return team.id
}

const checkMatchday = async (matchdaynumber, seasonId) => {
    let matchday = await prisma.matchday.findFirst({
        where: { matchday: matchdaynumber, seasonId: seasonId },
    })

    // Wenn der Spieltag nicht in der DB vorhanden ist, wird er neu angelegt
    if (!matchday) {
        matchday = await prisma.matchday.create({
            data: {
                matchday: matchdaynumber,
                seasonId: seasonId,
            },
        })
    }

    return matchday.id
}

const checkGame = async (
    matchdayId,
    gamenumber,
    homeId,
    awayId,
    date,
    homePoints,
    awayPoints
) => {
    let game = await prisma.game.findFirst({
        where: { matchdayId, gamenumber },
    })

    // Wenn das Spiel nicht in der DB vorhanden ist, wird es neu angelegt,
    // ansonsten, wenn sich das Datum oder die Punkte geändert haben, wird das
    // Spiel aktualisiert
    if (!game) {
        game = await prisma.game.create({
            data: {
                matchdayId,
                gamenumber,
                homeTeamId: homeId,
                awayTeamId: awayId,
                date,
                homePoints,
                awayPoints,
            },
        })
    } else {
        if (
            date !== game.date ||
            homePoints !== game.homePoints ||
            awayPoints !== game.awayPoints
        ) {
            game = await prisma.game.update({
                where: { UniqueMatchdayGamenumber: { matchdayId, gamenumber } },
                data: { date, homePoints, awayPoints },
            })
        }
    }

    return game
}
