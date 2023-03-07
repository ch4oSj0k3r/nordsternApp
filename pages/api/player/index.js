// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
  const {method} = req
  switch (method) {
    case 'GET':
      try {
        const {withStats} = req.query

        let players = []
        if (withStats) {
          players = await prisma.player.findMany({
            where: {active: true},
            include: {playerStats: true},
          })
        } else {
          players = await prisma.player.findMany({where: {active: true}})
        }

        res.status(200).json(players)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({error: 'Error fetching posts'})
      }
      break
    case 'POST':
      try {
        const player = req.body

        const team = await prisma.team.findFirst({
          where: {name: {contains: player.team}},
        })

        if (!team) {
          res.status(500).json({error: 'Team not exists'})
        } else {
          delete player.team

          await prisma.player.create({
            data: {
              ...player,
              teamId: team.id,
            },
          })
          const players = await prisma.player.findMany({})

          res.status(200).json(players)
        }
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
