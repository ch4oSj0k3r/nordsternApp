import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../../prisma/prisma';
import PlayerRadarChart from './PlayerRadarChart';
import { MdArrowBack } from 'react-icons/md';

export default async function PlayerStatsDetail({
    params,
}: {
    params: Promise<{ playerId: string }>;
}) {
    const { playerId } = await params;

    const player = await prisma.player.findUnique({
        where: { id: parseInt(playerId) },
        include: { playerStats: true },
    });

    if (!player) notFound();

    return (
        <div className="p-4 lg:p-6">
            <div className="mb-6">
                <Link
                    href="/playerStats"
                    className="inline-flex items-center gap-1.5 text-sm text-base-content/40 hover:text-primary transition-colors mb-3"
                >
                    <MdArrowBack className="h-4 w-4" />
                    Zurück
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-base-content">
                    {player.firstname} {player.lastname}
                </h1>
                <p className="text-sm text-base-content/40 font-mono">
                    #{player.playernumber}
                </p>
            </div>
            <div className="h-[400px] bg-base-200 border border-white/5 p-4">
                <PlayerRadarChart playerStats={player.playerStats} />
            </div>
        </div>
    );
}
