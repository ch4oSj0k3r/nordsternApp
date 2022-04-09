import React, {useCallback} from 'react'
import Link from 'next/link'
import {PrismaClient} from '@prisma/client'

import Table from '../../components/Table'
import {addStats} from '../../helpers'

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const players = await prisma.player.findMany({
    where: {teamId: 5},
    include: {stats: true},
  })

  return {
    props: {players}, // will be passed to the page component as props
  }
}

export default function Stats({players}) {
  const add80 = useCallback(async player => {
    await addStats({player, type: 'over80'})
  }, [])
  const add100 = useCallback(async player => {
    await addStats({player, type: 'over100'})
  }, [])
  const add120 = useCallback(async player => {
    await addStats({player, type: 'over120'})
  }, [])
  const add180 = useCallback(async player => {
    await addStats({player, type: 'over180'})
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstname',
        Cell: props => (
          <div>
            <Link href={`/stats/${props.row.original.id}`}>
              <a>{props.row.original.firstname}</a>
            </Link>
          </div>
        ),
      },
      {
        Header: () => <div className="text-center">80+</div>,
        accessor: 'player.stats.over80',
        Cell: props => (
          <div className="text-center">
            <button className="btn" onClick={() => add80(props.row.original)}>
              80+
            </button>
          </div>
        ),
      },
      {
        Header: () => <div className="text-center">100+</div>,
        accessor: 'player.stats.over100',
        Cell: props => (
          <div className="text-center">
            <button className="btn" onClick={() => add100(props.row.original)}>
              100+
            </button>
          </div>
        ),
      },
      {
        Header: () => <div className="text-center">120+</div>,
        accessor: 'player.stats.over120',
        Cell: props => (
          <div className="text-center">
            <button className="btn" onClick={() => add120(props.row.original)}>
              120+
            </button>
          </div>
        ),
      },
      {
        Header: () => <div className="text-center">180</div>,
        accessor: 'player.stats.over180',
        Cell: props => (
          <div className="text-center">
            <button className="btn" onClick={() => add180(props.row.original)}>
              180
            </button>
          </div>
        ),
      },
    ],
    [add80, add100, add120, add180],
  )

  return (
    <div>
      <Table columns={columns} data={players} />
    </div>
  )
}
