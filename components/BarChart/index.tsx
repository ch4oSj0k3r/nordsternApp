'use client';

import React, { useMemo, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Prisma } from '@prisma/client';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type PlayerStatEntry = Prisma.PlayerStatsGetPayload<{
    include: { game: { include: { matchday: true } } };
}>;

interface BarChartProps {
    playerStats: PlayerStatEntry[];
    minify?: boolean;
}

interface ChartColors {
    primary: string;
    accent: string;
    baseContent: string;
}

function getCSSColor(variable: string): string {
    if (typeof window === 'undefined') return '#e36e00';
    const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    return raw ? `oklch(${raw})` : '#e36e00';
}

const BarChart = ({ playerStats, minify = false }: BarChartProps) => {
    const [colors, setColors] = useState<ChartColors>({
        primary: '#e36e00',
        accent: '#a6302e',
        baseContent: 'rgba(255,255,255,0.4)',
    });

    useEffect(() => {
        setColors({
            primary: getCSSColor('--p'),
            accent: getCSSColor('--a'),
            baseContent: getCSSColor('--bc'),
        });
    }, []);

    const dataValues = useMemo(() => {
        const stats = [0, 0, 0, 0];
        for (const stat of playerStats) {
            stats[0] += stat.over100 || 0;
            stats[1] += stat.over140 || 0;
            stats[2] += stat.over180 || 0;
            stats[3] += stat.highFinish || 0;
        }
        return stats;
    }, [playerStats]);

    const data = {
        labels: ['100+', '140+', '180', 'High-Finish'],
        datasets: [
            {
                label: '# Treffer',
                data: dataValues,
                backgroundColor: colors.primary,
                borderColor: colors.accent,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                ticks: { color: colors.primary },
                grid: { color: 'rgba(255,255,255,0.1)' },
            },
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: {
                    color: colors.primary,
                    z: 100,
                    stepSize: 1,
                },
                max: Math.max(...dataValues) + 5,
            },
        },
    };

    return <Bar options={options} data={data} />;
};

export default BarChart;
