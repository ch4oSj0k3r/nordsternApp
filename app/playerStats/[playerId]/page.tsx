import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../../prisma/prisma';
import PlayerRadarChart from './PlayerRadarChart';

export default async function PlayerStatsDetail({
    params,
}: {
    params: Promise<{ playerId: string }>;
}) {
    const { playerId } = await params;

    const player = await prisma.player.findFirst({
        where: { id: parseInt(playerId) },
        include: { playerStats: true },
    });

    if (!player) notFound();

    return (
        <div className="h-full">
            <div>
                <Link href="/playerStats">
                    <button className="btn btn-outline">Zurück</button>
                </Link>
            </div>
            <div className="h-3/4">
                <PlayerRadarChart playerStats={player.playerStats} />
            </div>
        </div>
    );
}
