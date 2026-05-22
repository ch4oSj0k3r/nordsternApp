'use client';

import React, { useState } from 'react';

import {
    GiHouse,
    GiCityCar,
    GiPencil,
    GiCalendar,
    GiFinishLine,
} from 'react-icons/gi';

import Widget from '../..';
import { activeTeamId, updateGame } from '../../../../helpers';

export default function GameWidget({ headline, game, editable }) {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [homePoints, setHomePoints] = useState(game?.homePoints);
    const [awayPoints, setAwayPoints] = useState(game?.awayPoints);

    if (!game) {
        return '';
    }

    const date = new Date(game.date);
    const dateString = date.toLocaleDateString(undefined, {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const save = () => {
        setLoading(true);
        updateGame(game.id, { homePoints, awayPoints })
            .then(() => {
                setLoading(false);
                setEditMode(false);
                // Router.reload(window.location.pathname)
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <Widget>
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-md text-nsOrange" />
                </div>
            </Widget>
        );
    }

    return (
        <Widget>
            <div className="flex items-center">
                {headline && (
                    <div className="grow">
                        <h2 className="card-title text-nsOrange">{headline}</h2>
                    </div>
                )}
                {editable && (
                    <div
                        htmlFor="gameModal"
                        className="cursor-pointer"
                        onClick={() => setEditMode(!editMode)}
                    >
                        <GiPencil />
                    </div>
                )}
            </div>
            <div
                className={`${
                    game.homeTeam.id === activeTeamId ? 'text-nsRed' : ''
                }`}
            >
                <GiHouse className="text-nsRed inline-block mr-2" />
                {game.homeTeam.name}
            </div>
            <div
                className={`${
                    game.awayTeam.id === activeTeamId ? 'text-nsRed' : ''
                }`}
            >
                <GiCityCar className="text-nsRed inline-block mr-2" />
                {game.awayTeam.name}
            </div>
            <div>
                <GiCalendar className="text-nsRed inline-block mr-2" />
                {dateString}
            </div>
            {!editMode && (homePoints || awayPoints) && (
                <div>
                    <GiFinishLine className="text-nsRed inline-block mr-2" />
                    {`Ende ${homePoints} : ${awayPoints}`}
                </div>
            )}
            {editMode && (
                <div className="grid grid-cols-1 gap-1">
                    <input
                        value={homePoints}
                        type="number"
                        placeholder="Heim"
                        className="input input-bordered max-w-xs focus:outline-none"
                        onChange={(e) => setHomePoints(e.target.value)}
                    />
                    <input
                        value={awayPoints}
                        type="number"
                        placeholder="Auswärts"
                        className="input input-bordered max-w-xs focus:outline-none"
                        onChange={(e) => setAwayPoints(e.target.value)}
                    />
                    <div className="text-right">
                        <button className="btn text-nsBrown" onClick={save}>
                            Speichern
                        </button>
                    </div>
                </div>
            )}
        </Widget>
    );
}
