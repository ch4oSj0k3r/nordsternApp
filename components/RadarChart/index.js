'use client';

import React, { useMemo, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function getCSSColor(variable) {
    if (typeof window === 'undefined') return '#e36e00';
    const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    return raw ? `oklch(${raw})` : '#e36e00';
}

const RadarChart = ({ playerStats, minify = false }) => {
    const [colors, setColors] = useState({
        primary: '#e36e00',
        accent: '#a6302e',
    });

    useEffect(() => {
        setColors({
            primary: getCSSColor('--p'),
            accent: getCSSColor('--a'),
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
                backgroundColor: `${colors.primary}33`,
                borderColor: colors.primary,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            r: {
                angleLines: { color: colors.accent },
                grid: { color: colors.accent },
                pointLabels: { color: colors.primary },
                ticks: {
                    display: !minify,
                    color: colors.primary,
                    backdropColor: 'transparent',
                    z: 100,
                    stepSize: 1,
                },
                min: 0,
            },
        },
    };

    return <Radar options={options} data={data} />;
};

export default RadarChart;
