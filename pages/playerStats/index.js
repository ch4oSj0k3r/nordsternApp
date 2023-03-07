import React, {useCallback, useState} from 'react'
import Link from 'next/link'
import {PrismaClient} from '@prisma/client'

import Table from '../../components/Table'
import {addStats} from '../../helpers'

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const initPlayers = await prisma.player.findMany({
    where: {teamId: 4, active: true},
    include: {playerStats: true},
  })

  return {
    props: {initPlayers}, // will be passed to the page component as props
  }
}

export default function PlayerStats({initPlayers}) {
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState(initPlayers)

  const setStats = useCallback(async (player, type) => {
    setLoading(true)
    await addStats({player, type}).then(res => {
      setPlayers(res)
      setLoading(false)
    })
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstname',
        Cell: props => (
          <div>
            <Link href={`/playerStats/${props.row.original.id}`}>
              <a>{props.row.original.firstname}</a>
            </Link>
          </div>
        ),
      },
      {
        Header: () => <div className="text-center">100+</div>,
        accessor: 'player.playerStats.over100',
        Cell: props => {
          return (
            <div className="text-center">
              <button
                className="btn text-secondary p-2 md:p-4"
                onClick={() => setStats(props.row.original, 'over100')}
                disabled={loading}
              >
                100+
              </button>
            </div>
          )
        },
      },
      {
        Header: () => <div className="text-center">140+</div>,
        accessor: 'player.playerStats.over140',
        Cell: props => (
          <div className="text-center">
            <button
              className="btn text-secondary p-2 md:p-4"
              onClick={() => setStats(props.row.original, 'over140')}
              disabled={loading}
            >
              140+
            </button>
          </div>
        ),
      },
      {
        Header: () => <div className="text-center">180</div>,
        accessor: 'player.playerStats.over180',
        Cell: props => (
          <div className="text-center">
            <button
              className="btn text-secondary p-2 md:p-4"
              onClick={() => setStats(props.row.original, 'over180')}
              disabled={loading}
            >
              180
            </button>
          </div>
        ),
      },
      {
        Header: () => (
          <div className="text-center">
            <span className="block md:hidden">HF</span>
            <span className="hidden md:block">High-Finish</span>
          </div>
        ),
        accessor: 'player.playerStats.highFinish',
        Cell: props => (
          <div className="text-center">
            <button
              className="btn text-secondary p-2 md:p-4"
              onClick={() => setStats(props.row.original, 'highFinish')}
              disabled={loading}
            >
              <span className="block md:hidden">HF</span>
              <span className="hidden md:block">High-Finish</span>
            </button>
          </div>
        ),
      },
    ],
    [loading, setStats],
  )

  return (
    <div>
      <Table columns={columns} data={players} />
    </div>
  )
}
