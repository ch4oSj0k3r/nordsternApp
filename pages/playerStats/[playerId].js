import React from 'react';
import prisma from '../../prisma/prisma';
import Link from 'next/link';

import RadarChart from '../../components/RadarChart';

export async function getServerSideProps({ params }) {
    const { playerId } = params;

    const player = await prisma.player.findFirst({
        where: { id: parseInt(playerId) },
        include: { playerStats: true },
    });

    return {
        props: { player }, // will be passed to the page component as props
    };
}

export default function PlayerStatsDetail({ player }) {
    const stats = player?.playerStats || [];

    return (
        <div className="h-full">
            <div>
                <Link href="/playerStats" passHref legacyBehavior>
                    <button className="btn btn-outline">Zurück</button>
                </Link>
            </div>
            <div className="h-3/4">
                <RadarChart playerStats={stats} />
            </div>
        </div>
    );
}
