import React, {useCallback} from 'react'
import Link from 'next/link'
import {PrismaClient} from '@prisma/client'

import Table from '../../components/Table'
import {addStats} from '../../helpers'

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const players = await prisma.player.findMany({
    where: {teamId: 4},
    include: {playerStats: true},
  })

  return {
    props: {players}, // will be passed to the page component as props
  }
}

export default function PlayerStats({players}) {
  const add100 = useCallback(async player => {
    await addStats({player, type: 'over100'})
  }, [])
  const add140 = useCallback(async player => {
    await addStats({player, type: 'over140'})
  }, [])
  const add180 = useCallback(async player => {
    await addStats({player, type: 'over180'})
  }, [])
  const addHF = useCallback(async player => {
    await addStats({player, type: 'highFinish'})
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
        Cell: props => (
          <div className="text-center">
            <button
              className="btn text-secondary p-2 md:p-4"
              onClick={() => add100(props.row.original)}
            >
              100+
            </button>
          </div>
        ),
      },
      {
        Header: () => <div className="text-center">140+</div>,
        accessor: 'player.playerStats.over140',
        Cell: props => (
          <div className="text-center">
            <button
              className="btn text-secondary p-2 md:p-4"
              onClick={() => add140(props.row.original)}
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
              onClick={() => add180(props.row.original)}
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
              onClick={() => addHF(props.row.original)}
            >
              <span className="block md:hidden">HF</span>
              <span className="hidden md:block">High-Finish</span>
            </button>
          </div>
        ),
      },
    ],
    [add100, add140, add180, addHF],
  )

  return (
    <div>
      <Table columns={columns} data={players} />
    </div>
  )
}
