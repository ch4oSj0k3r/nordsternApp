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

export default function GameWidget({ headline, game, editable, hero = false }) {
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
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <Widget>
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-md text-primary" />
                </div>
            </Widget>
        );
    }

    return (
        <Widget className={hero ? 'border border-primary/30 bg-primary/5' : ''}>
            <div className="flex items-center">
                {headline && (
                    <div className="grow">
                        <h2 className="card-title text-primary text-lg font-semibold tracking-wide">
                            {headline}
                        </h2>
                    </div>
                )}
                {editable && (
                    <div
                        className="cursor-pointer text-base-content/50 hover:text-primary transition-colors"
                        onClick={() => setEditMode(!editMode)}
                    >
                        <GiPencil />
                    </div>
                )}
            </div>
            <div
                className={`flex items-center gap-2 mt-1 ${
                    game.homeTeam.id === activeTeamId
                        ? 'text-accent font-semibold'
                        : 'text-base-content/80'
                }`}
            >
                <GiHouse className="text-accent flex-shrink-0" />
                {game.homeTeam.name}
            </div>
            <div
                className={`flex items-center gap-2 ${
                    game.awayTeam.id === activeTeamId
                        ? 'text-accent font-semibold'
                        : 'text-base-content/80'
                }`}
            >
                <GiCityCar className="text-accent flex-shrink-0" />
                {game.awayTeam.name}
            </div>
            <div className="flex items-center gap-2 text-base-content/60 text-sm mt-1">
                <GiCalendar className="flex-shrink-0" />
                {dateString}
            </div>
            {!editMode && (homePoints || awayPoints) && (
                <div className="flex items-center gap-2 text-base-content/60 text-sm">
                    <GiFinishLine className="flex-shrink-0" />
                    {`Ende ${homePoints} : ${awayPoints}`}
                </div>
            )}
            {editMode && (
                <div className="grid grid-cols-1 gap-2 mt-2">
                    <input
                        value={homePoints}
                        type="number"
                        placeholder="Heim"
                        className="input input-bordered input-sm max-w-xs focus:outline-none focus:border-primary"
                        onChange={(e) => setHomePoints(e.target.value)}
                    />
                    <input
                        value={awayPoints}
                        type="number"
                        placeholder="Auswärts"
                        className="input input-bordered input-sm max-w-xs focus:outline-none focus:border-primary"
                        onChange={(e) => setAwayPoints(e.target.value)}
                    />
                    <div className="text-right">
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={save}
                        >
                            Speichern
                        </button>
                    </div>
                </div>
            )}
        </Widget>
    );
}
