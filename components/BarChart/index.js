import React, { useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ playerStats, minify = false }) => {
    const dataValues = useMemo(() => {
        const stats = [0, 0, 0, 0]
        for (const stat of playerStats) {
            stats[0] += stat.over100 || 0
            stats[1] += stat.over140 || 0
            stats[2] += stat.over180 || 0
            stats[3] += stat.highFinish || 0
        }
        return stats
    }, [playerStats])

    const data = {
        labels: ['100+', '140+', '180', 'High-Finish'],
        datasets: [
            {
                label: '# Treffer',
                data: dataValues,
                backgroundColor: '#e36e00',
                borderColor: '#a6302e',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        legend: {
            fontColor: 'red',
        },
        scales: {
            x: {
                ticks: {
                    color: '#e36e00',
                },
                grid: {
                    color: 'white',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'white',
                },
                ticks: {
                    color: '#e36e00',
                    backdropColor: '#000000',
                    z: 100,
                    stepSize: 1,
                },
                max: Math.max(...dataValues) + 5,
            },
        },
    }

    return <Bar options={options} data={data} />
}

export default BarChart
