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
    include: {stats: true},
  })

  return {
    props: {player}, // will be passed to the page component as props
  }
}

export default function PlayerStats({player}) {
  const dataValues = []
  Object.entries(player.stats).forEach(([key, entry]) => {
    if (key !== 'id') {
      dataValues.push(entry)
    }
  })
  const data = {
    labels: ['80+', '100+', '120+', '140+', '180'],
    datasets: [
      {
        label: '# Treffer',
        data: dataValues,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    scale: {
      gridLines: {
        color: ['red'],
      },
    },
  }

  return (
    <div className="h-full">
      <div>
        <Link href="/stats" passHref>
          <button className="btn btn-outline">Zurück</button>
        </Link>
      </div>
      <Radar options={options} data={data} />
    </div>
  )
}
