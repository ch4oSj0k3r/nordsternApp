// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/prisma'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const date = await prisma.keepDbAlive.findFirst({
                    orderBy: { id: 'desc' },
                })
                res.status(200).json(date)
            } catch (e) {
                console.error('Request error', e)
                res.status(500).json({ error: 'Error fetching posts' })
            }
            break
        case 'POST':
            try {
                const today = new Date()

                await prisma.keepDbAlive.create({
                    data: {
                        date: today.toISOString(),
                    },
                })

                res.status(200).json({ result: true })
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
