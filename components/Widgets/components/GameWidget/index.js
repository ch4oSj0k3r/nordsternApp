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

    if (!game) return '';

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
            .catch(() => setLoading(false));
    };

    if (loading) {
        return (
            <Widget className={hero ? 'border-l-4 border-l-primary' : ''}>
                <div className="flex justify-center py-4">
                    <span className="loading loading-spinner loading-md text-primary" />
                </div>
            </Widget>
        );
    }

    return (
        <Widget
            className={
                hero ? 'border-l-4 border-l-primary glow-primary-sm' : ''
            }
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                {headline && (
                    <div>
                        {hero && (
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 block mb-1">
                                Nächstes Spiel
                            </span>
                        )}
                        <h2
                            className={`font-bold tracking-tight ${
                                hero
                                    ? 'text-xl text-base-content'
                                    : 'text-base text-primary'
                            }`}
                        >
                            {hero
                                ? `${game.homeTeam.name} vs ${game.awayTeam.name}`
                                : headline}
                        </h2>
                    </div>
                )}
                {editable && (
                    <button
                        className="text-base-content/30 hover:text-primary transition-colors mt-0.5 flex-shrink-0"
                        onClick={() => setEditMode(!editMode)}
                    >
                        <GiPencil className="h-4 w-4" />
                    </button>
                )}
            </div>

            {!hero && (
                <>
                    <div
                        className={`flex items-center gap-2 text-sm mb-1 ${
                            game.homeTeam.id === activeTeamId
                                ? 'text-primary font-semibold'
                                : 'text-base-content/70'
                        }`}
                    >
                        <GiHouse className="h-4 w-4 flex-shrink-0 text-accent" />
                        {game.homeTeam.name}
                    </div>
                    <div
                        className={`flex items-center gap-2 text-sm mb-2 ${
                            game.awayTeam.id === activeTeamId
                                ? 'text-primary font-semibold'
                                : 'text-base-content/70'
                        }`}
                    >
                        <GiCityCar className="h-4 w-4 flex-shrink-0 text-accent" />
                        {game.awayTeam.name}
                    </div>
                </>
            )}

            <div className="flex items-center gap-2 text-xs text-base-content/40 mb-1">
                <GiCalendar className="h-3.5 w-3.5 flex-shrink-0" />
                {dateString}
            </div>

            {hero && (
                <div className="flex items-center gap-6 mt-3">
                    <div
                        className={`text-sm font-medium ${
                            game.homeTeam.id === activeTeamId
                                ? 'text-primary'
                                : 'text-base-content/60'
                        }`}
                    >
                        <GiHouse className="h-4 w-4 inline-block mr-1.5 text-accent" />
                        {game.homeTeam.name}
                    </div>
                    <div
                        className={`text-sm font-medium ${
                            game.awayTeam.id === activeTeamId
                                ? 'text-primary'
                                : 'text-base-content/60'
                        }`}
                    >
                        <GiCityCar className="h-4 w-4 inline-block mr-1.5 text-accent" />
                        {game.awayTeam.name}
                    </div>
                </div>
            )}

            {!editMode && (homePoints || awayPoints) && (
                <div className="flex items-center gap-2 text-xs text-base-content/40 mt-1">
                    <GiFinishLine className="h-3.5 w-3.5 flex-shrink-0" />
                    {`Ergebnis: ${homePoints} : ${awayPoints}`}
                </div>
            )}

            {editMode && (
                <div className="grid grid-cols-1 gap-2 mt-3 pt-3 border-t border-white/5">
                    <input
                        value={homePoints ?? ''}
                        type="number"
                        placeholder="Heim"
                        className="input input-bordered input-sm w-full focus:outline-none focus:border-primary bg-base-300"
                        onChange={(e) => setHomePoints(e.target.value)}
                    />
                    <input
                        value={awayPoints ?? ''}
                        type="number"
                        placeholder="Auswärts"
                        className="input input-bordered input-sm w-full focus:outline-none focus:border-primary bg-base-300"
                        onChange={(e) => setAwayPoints(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <button
                            className="btn btn-sm btn-primary"
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
