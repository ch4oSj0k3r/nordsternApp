import React from 'react'
import { useTable } from 'react-table'

import { activeTeamId } from '../../helpers'

export default function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        })

    return (
        <div>
            <table
                className="table table-compact sm:table-normal table-zebra w-full"
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, i) => (
                                <th key={i} {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr
                                key={i}
                                {...row.getRowProps()}
                                className={`${
                                    row.original.id === activeTeamId
                                        ? 'text-nsRed font-bold'
                                        : ''
                                }`}
                            >
                                {row.cells.map((cell, i) => {
                                    return (
                                        <td
                                            key={i}
                                            {...cell.getCellProps()}
                                            className="max-w-24 lg:max-w-full overflow-x-auto"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
