import React from 'react'
import {PrismaClient} from '@prisma/client'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import {Radar} from 'react-chartjs-2'
import Link from 'next/link'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

export async function getServerSideProps({params}) {
  const prisma = new PrismaClient()
  const {playerId} = params

  const player = await prisma.player.findFirst({
    where: {id: parseInt(playerId)},
    include: {playerStats: true},
  })

  return {
    props: {player}, // will be passed to the page component as props
  }
}

export default function PlayerStatsDetail({player}) {
  const dataValues = []
  const stats = player?.playerStats || {}
  Object.entries(stats).forEach(([key, entry]) => {
    if (key !== 'id' && key !== 'playerId') {
      dataValues.push(entry)
    }
  })
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
          //   showLabelBackdrop: false,
          color: '#e36e00',
          backdropColor: '#000000',
          z: 100,
          stepSize: 1,
        },
      },
    },
  }

  return (
    <div className="h-full">
      <div>
        <Link href="/playerStats" passHref>
          <button className="btn btn-outline">Zurück</button>
        </Link>
      </div>
      <div className="h-3/4">
        <Radar options={options} data={data} />
      </div>
    </div>
  )
}
