'use client';

import React from 'react';
import { useTable } from 'react-table';
import { activeTeamId } from '../../helpers';

export default function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr
                            key={i}
                            {...headerGroup.getHeaderGroupProps()}
                            className="border-b border-white/5"
                        >
                            {headerGroup.headers.map((column, i) => (
                                <th
                                    key={i}
                                    {...column.getHeaderProps()}
                                    className="text-left py-2 px-2 text-xs font-semibold uppercase tracking-wider text-base-content/30"
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
                        const isActive = row.original.id === activeTeamId;
                        return (
                            <tr
                                key={i}
                                {...row.getRowProps()}
                                className={`border-b border-white/5 transition-colors ${
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-white/3 text-base-content/80'
                                }`}
                            >
                                {row.cells.map((cell, i) => (
                                    <td
                                        key={i}
                                        {...cell.getCellProps()}
                                        className={`py-2 px-2 ${
                                            isActive ? 'font-semibold' : ''
                                        }`}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
