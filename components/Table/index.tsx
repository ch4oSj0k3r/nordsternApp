'use client';

import React from 'react';
import { useTable, Column } from 'react-table';
import { activeTeamId } from '../../helpers';
import { TableRow } from '../../helpers';

interface TableProps {
    columns: Column<TableRow>[];
    data: TableRow[];
}

export default function Table({ columns, data }: TableProps) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key, ...headerGroupProps } =
                            headerGroup.getHeaderGroupProps();
                        return (
                            <tr
                                key={key}
                                {...headerGroupProps}
                                className="border-b border-white/5"
                            >
                                {headerGroup.headers.map((column) => {
                                    const { key, ...headerProps } =
                                        column.getHeaderProps();
                                    return (
                                        <th
                                            key={key}
                                            {...headerProps}
                                            className="text-left py-2 px-2 text-xs font-semibold uppercase tracking-wider text-base-content/30"
                                        >
                                            {column.render('Header')}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        const isActive = row.original.id === activeTeamId;
                        const { key, ...rowProps } = row.getRowProps();
                        return (
                            <tr
                                key={key}
                                {...rowProps}
                                className={`border-b border-white/5 transition-colors ${
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-white/3 text-base-content/80'
                                }`}
                            >
                                {row.cells.map((cell) => {
                                    const { key, ...cellProps } =
                                        cell.getCellProps();
                                    return (
                                        <td
                                            key={key}
                                            {...cellProps}
                                            className={`py-2 px-2 ${
                                                isActive ? 'font-semibold' : ''
                                            }`}
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
