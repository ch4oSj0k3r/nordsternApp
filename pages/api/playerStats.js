// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/prisma'

const defaultVal = {
    over100: 0,
    over140: 0,
    over180: 0,
    highFinish: 0,
}

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const stats = await prisma.playerStats.findMany({
                    include: { player: true },
                })
                res.status(200).json(stats)
            } catch (e) {
                console.error('Request error', e)
                res.status(500).json({ error: 'Error fetching posts' })
            }
            break
        case 'POST':
            try {
                const { player, type, gameId } = req.body

                await prisma.playerStats.upsert({
                    where: {
                        UniqueGamePlayer: {
                            playerId: player.id,
                            gameId: gameId,
                        },
                    },
                    create: {
                        ...defaultVal,
                        [type]: 1,
                        player: { connect: { id: player.id } },
                        game: { connect: { id: gameId } },
                    },
                    update: {
                        [type]: { increment: 1 },
                    },
                })

                const players = await prisma.player.findMany({
                    where: { teamId: 6, active: true },
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

                res.status(200).json(players)
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
