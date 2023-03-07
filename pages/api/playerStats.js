// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/prisma'

export default async function handler(req, res) {
  const {method} = req
  switch (method) {
    case 'GET':
      try {
        const stats = await prisma.playerStats.findMany({
          include: {player: true},
        })
        res.status(200).json(stats)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({error: 'Error fetching posts'})
      }
      break
    case 'POST':
      try {
        const {player, type} = req.body
        const defaultVal = {
          over100: 0,
          over140: 0,
          over180: 0,
          highFinish: 0,
        }

        if (!player.playerStats) {
          await prisma.playerStats.create({
            data: {
              ...defaultVal,
              [type]: 1,
              player: {
                connect: {
                  id: player.id,
                },
              },
            },
          })
        } else {
          await prisma.playerStats.update({
            where: {playerId: player.id},
            data: {
              [type]: player.playerStats[type] + 1,
            },
          })
        }

        const players = await prisma.player.findMany({
          where: {teamId: 4, active: true},
          include: {playerStats: true},
        })

        res.status(200).json(players)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({error: 'Error fetching posts'})
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
