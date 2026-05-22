'use client';

import React from 'react';
import { useTable } from 'react-table';

import { activeTeamId } from '../../helpers';

export default function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        });

    return (
        <div className="overflow-x-auto">
            <table
                className="table table-xs sm:table-sm table-zebra w-full"
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, i) => (
                                <th
                                    key={i}
                                    {...column.getHeaderProps()}
                                    className="text-base-content/60 text-xs uppercase tracking-wide"
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                key={i}
                                {...row.getRowProps()}
                                className={`${
                                    row.original.id === activeTeamId
                                        ? 'text-accent font-bold'
                                        : ''
                                }`}
                            >
                                {row.cells.map((cell, i) => {
                                    return (
                                        <td
                                            key={i}
                                            {...cell.getCellProps()}
                                            className="px-1 md:px-4"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
