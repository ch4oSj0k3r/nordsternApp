import React from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

const RadarChart = ({ playerStats, minify = false }) => {
    const dataValues = [
        playerStats?.over100 || 0,
        playerStats?.over140 || 0,
        playerStats?.over180 || 0,
        playerStats?.highFinish || 0,
    ]
    const data = {
        labels: ['100+', '140+', '180', 'High-Finish'],
        datasets: [
            {
                label: '# Treffer',
                data: dataValues,
                backgroundColor: 'rgba(227, 110, 0, .2)',
                borderColor: 'rgb(227, 110, 0)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            r: {
                angleLines: {
                    color: '#a6302e',
                },
                grid: {
                    color: '#a6302e',
                },
                pointLabels: {
                    color: '#e36e00',
                },
                ticks: {
                    display: !minify,
                    color: '#e36e00',
                    backdropColor: '#000000',
                    z: 100,
                    stepSize: 1,
                },
                min: 0,
            },
        },
    }

    return <Radar options={options} data={data} />
}

export default RadarChart
