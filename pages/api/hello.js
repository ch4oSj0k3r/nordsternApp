// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/prisma'

export default async function assetHandler(req, res) {
  const {method} = req
  switch (method) {
    case 'GET':
      try {
        const stars = await prisma.season.findMany()
        res.status(200).json(stars)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({error: 'Error fetching posts'})
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
