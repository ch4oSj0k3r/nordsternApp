'use client';

import dynamic from 'next/dynamic';

const RadarChart = dynamic(() => import('../../../components/RadarChart'), {
    ssr: false,
});

export default function PlayerRadarChart({
    playerStats,
}: {
    playerStats: any[];
}) {
    return <RadarChart playerStats={playerStats} />;
}
