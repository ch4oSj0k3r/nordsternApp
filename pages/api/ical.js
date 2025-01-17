// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/prisma'
import ical from 'ical-generator'

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

                const calendar = ical({
                    name: seasons[seasons.length - 1].name,
                })
                schedule.map((game) => {
                    if (
                        game.homeTeam.name === 'Team Nordstern' ||
                        game.awayTeam.name === 'Team Nordstern'
                    ) {
                        const startTime = new Date(game.date)
                        const endTime = new Date(game.date)
                        endTime.setHours(startTime.getHours() + 3)

                        calendar.createEvent({
                            start: startTime,
                            end: endTime,
                            timezone: 'Europe/Berlin',
                            summary: `${game.homeTeam.name} : ${game.awayTeam.name}`,
                        })
                    }
                })

                res.writeHead(200, {
                    'Content-Type': 'text/ calendar; charset=utf-8',
                    'Content-Disposition':
                        'attachment; filename="calendar.ics"',
                })
                res.end(calendar.toString())
            } catch (e) {
                console.error('Request error', e)
                res.status(500).json({ error: 'Error fetching ical' })
            }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
    }
}
