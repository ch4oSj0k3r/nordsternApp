import {PrismaClient} from '@prisma/client'

// import readXlsxFile from 'read-excel-file'

import {getTable} from '../helpers'

import TableWidget from '../components/Widgets/components/TableWidget'
import GameWidget from '../components/Widgets/components/GameWidget'

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const games = await prisma.game.findMany({
    include: {homeTeam: true, awayTeam: true},
  })
  const table = getTable(games)

  const today = new Date()
  const nextNordsternGame = await prisma.game.findFirst({
    where: {OR: [{homeTeamId: 5}, {awayTeamId: 5}], date: {gte: today}},
    include: {homeTeam: true, awayTeam: true},
    orderBy: {date: 'asc'},
  })

  return {
    props: {table, nextNordsternGame}, // will be passed to the page component as props
  }
}

export default function Dashboard({table, nextNordsternGame}) {
  // const readFile = e => {
  //   readXlsxFile(e.target.files[0]).then(rows => {
  //     fetch('http://localhost:3000/api/schedule', {
  //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //       mode: 'cors', // no-cors, *cors, same-origin
  //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: 'same-origin', // include, *same-origin, omit
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       redirect: 'follow', // manual, *follow, error
  //       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //       body: JSON.stringify(rows), // body data type must match "Content-Type" header
  //     })
  //   })
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
      <div>
        <div className="grid grid-cols-1 gap-4">
          <GameWidget headline="Nächstes Spiel" game={nextNordsternGame} />
        </div>
      </div>
      <div>
        {/* <input type="file" onChange={readFile} /> */}
        <TableWidget table={table} />
      </div>
    </div>
  )
}
