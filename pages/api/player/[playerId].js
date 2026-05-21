// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../prisma/prisma';

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'DELETE':
            try {
                const { playerId } = req.query;

                if (playerId) {
                    await prisma.player.delete({
                        where: { id: parseInt(playerId) },
                    });
                    const players = await prisma.player.findMany({});
                    res.status(200).json(players);
                } else {
                    res.status(500).json({ error: 'Player not exists' });
                }
            } catch (e) {
                console.error('Request error', e);
                res.status(500).json({ error: 'Error fetching posts' });
            }
            break;
        default:
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
