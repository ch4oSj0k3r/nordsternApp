// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../prisma/prisma';

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const { gameId } = req.query;
                const { homePoints, awayPoints } = req.body;

                if (homePoints && awayPoints) {
                    await prisma.game.update({
                        where: { id: parseInt(gameId) },
                        data: {
                            homePoints: parseInt(homePoints),
                            awayPoints: parseInt(awayPoints),
                        },
                    });

                    res.status(200).json({});
                } else {
                    res.status(500).json({ error: 'Points are missing' });
                }
            } catch (e) {
                console.error('Request error', e);
                res.status(500).json({ error: 'Error fetching posts' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
