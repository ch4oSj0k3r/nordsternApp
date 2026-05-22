'use client';

import React from 'react';
import { Column } from 'react-table';
import Widget from '../..';
import Table from '../../../Table';
import { TableRow } from '../../../../helpers';

interface TableWidgetProps {
    table: TableRow[];
}

export default function TableWidget({ table }: TableWidgetProps) {
    const columns = React.useMemo<Column<TableRow>[]>(
        () => [
            {
                Header: '#',
                accessor: 'place',
                Cell: (props) => (
                    <span className="font-mono text-base-content/40">
                        {props.value}
                    </span>
                ),
            },
            { Header: 'Name', accessor: 'name' },
            { Header: 'SpT', accessor: 'games' },
            { Header: 'S', accessor: 'wins' },
            { Header: 'N', accessor: 'losses' },
            {
                Header: 'Sp',
                accessor: 'winGames',
                Cell: (props) =>
                    `${props.row.original.winGames}:${props.row.original.lossGames}`,
            },
            {
                Header: 'Pkt',
                accessor: 'points',
                Cell: (props) => (
                    <span className="font-bold">{props.value}</span>
                ),
            },
        ],
        []
    );

    return (
        <Widget>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-primary flex-shrink-0" />
                <h2 className="font-bold text-base text-base-content tracking-tight">
                    Tabelle
                </h2>
            </div>
            <Table columns={columns} data={table} />
        </Widget>
    );
}
