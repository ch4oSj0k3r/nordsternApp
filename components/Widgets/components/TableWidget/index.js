'use client';

import React from 'react';

import Widget from '../..';
import Table from '../../../Table';

export default function TableWidget({ table }) {
    const columns = React.useMemo(
        () => [
            {
                Header: () => <div style={{ textAlign: 'center' }}>#</div>,
                accessor: 'place',
                Cell: (props) => (
                    <div style={{ textAlign: 'center' }}>{props.value}.</div>
                ),
            },
            { Header: 'Name', accessor: 'name' },
            {
                Header: () => <div style={{ textAlign: 'center' }}>SpT</div>,
                accessor: 'games',
                Cell: (props) => (
                    <div style={{ textAlign: 'center' }}>{props.value}</div>
                ),
            },
            {
                Header: () => <div style={{ textAlign: 'center' }}>S</div>,
                accessor: 'wins',
                Cell: (props) => (
                    <div style={{ textAlign: 'center' }}>{props.value}</div>
                ),
            },
            {
                Header: () => <div style={{ textAlign: 'center' }}>N</div>,
                accessor: 'losses',
                Cell: (props) => (
                    <div style={{ textAlign: 'center' }}>{props.value}</div>
                ),
            },
            {
                Header: () => <div style={{ textAlign: 'center' }}>Sp</div>,
                accessor: 'winGames',
                Cell: (props) => (
                    <div style={{ textAlign: 'center' }}>
                        {`${props.row.original.winGames}:${props.row.original.lossGames}`}
                    </div>
                ),
            },
            {
                Header: () => <div style={{ textAlign: 'center' }}>Pkt</div>,
                accessor: 'points',
                Cell: (props) => (
                    <div style={{ textAlign: 'center' }}>{props.value}</div>
                ),
            },
        ],
        []
    );

    return (
        <Widget>
            <h2 className="card-title text-primary text-lg font-semibold tracking-wide">
                Tabelle
            </h2>
            <Table columns={columns} data={table} />
        </Widget>
    );
}
