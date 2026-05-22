'use client';

import React, { useMemo, useState } from 'react';
import { activeTeamId } from '../../helpers';
import PlayerWidget from '../../components/Widgets/components/PlayerWidget';
import { AiOutlineFilter } from 'react-icons/ai';

interface Season {
    id: number;
    name: string;
}

interface Props {
    currentSeasonId: number;
    seasons: Season[];
    initPlayers: any[];
    nordsternGames: any[];
}

export default function PlayerStatsClient({
    currentSeasonId,
    seasons,
    initPlayers,
    nordsternGames,
}: Props) {
    const [players, setPlayers] = useState(initPlayers);
    const [selectedSeason, setSelectedSeason] = useState(currentSeasonId);
    const [hiddenPlayers, setHiddenPlayers] = useState<number[]>([]);
    const [showDiagram, setShowDiagram] = useState(true);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);

    const visiblePlayers = useMemo(
        () => players.filter((p) => !hiddenPlayers.includes(p.id)),
        [hiddenPlayers, players]
    );

    const togglePlayer = (id: number) => {
        setHiddenPlayers((prev) => {
            const idx = prev.indexOf(id);
            return idx > -1 ? prev.filter((p) => p !== id) : [...prev, id];
        });
    };

    const gameOptions = useMemo(
        () =>
            nordsternGames.map((game) => {
                const opponentName =
                    game.homeTeam.id !== activeTeamId
                        ? game.homeTeam.name
                        : game.awayTeam.name;
                return (
                    <option key={game.id} value={game.id}>
                        {opponentName}
                    </option>
                );
            }),
        [nordsternGames]
    );

    return (
        <div className="p-4 lg:p-6">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-base-content">
                    Statistik
                </h1>
                <p className="text-sm text-base-content/40 mt-0.5">
                    {visiblePlayers.length} Spieler
                </p>
            </div>

            {/* Filter bar */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
                <select
                    className="select select-sm bg-base-200 border-white/10 focus:outline-none focus:border-primary text-sm min-w-[130px]"
                    value={selectedSeason}
                    onChange={(e) =>
                        setSelectedSeason(parseInt(e.target.value))
                    }
                >
                    {seasons.map((season) => (
                        <option key={season.id} value={season.id}>
                            {season.name}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-sm bg-base-200 border-white/10 focus:outline-none focus:border-primary text-sm min-w-[130px]"
                    value={selectedGame ?? ''}
                    onChange={(e) =>
                        setSelectedGame(
                            e.target.value ? parseInt(e.target.value) : null
                        )
                    }
                >
                    <option value="">Gesamt</option>
                    {gameOptions}
                </select>

                {/* Filter dropdown */}
                <div className="dropdown dropdown-end ml-auto">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm bg-base-200 border-white/10 hover:bg-base-300 text-base-content/60 gap-1.5"
                    >
                        <AiOutlineFilter className="h-4 w-4" />
                        Filter
                        {hiddenPlayers.length > 0 && (
                            <span className="badge badge-xs badge-primary">
                                {hiddenPlayers.length}
                            </span>
                        )}
                    </div>
                    <div
                        tabIndex={0}
                        className="dropdown-content z-[1] bg-base-200 border border-white/5 shadow-xl w-56 mt-1 p-2"
                    >
                        <p className="text-xs font-semibold uppercase tracking-wider text-base-content/30 px-2 pb-2">
                            Spieler
                        </p>
                        {players.map((player) => (
                            <label
                                key={player.id}
                                className="flex items-center gap-3 px-2 py-1.5 hover:bg-white/5 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-xs checkbox-primary"
                                    checked={!hiddenPlayers.includes(player.id)}
                                    onChange={() => togglePlayer(player.id)}
                                />
                                <span className="text-sm text-base-content/70">
                                    {player.firstname} {player.lastname}
                                </span>
                            </label>
                        ))}
                        <div className="border-t border-white/5 mt-2 pt-2">
                            <label className="flex items-center gap-3 px-2 py-1.5 hover:bg-white/5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-xs checkbox-primary"
                                    checked={showDiagram}
                                    onChange={() =>
                                        setShowDiagram(!showDiagram)
                                    }
                                />
                                <span className="text-sm text-base-content/70">
                                    Diagramm anzeigen
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Player grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visiblePlayers.map((player) => (
                    <PlayerWidget
                        key={player.id}
                        player={player}
                        selectedSeason={selectedSeason}
                        setPlayers={setPlayers}
                        showDiagram={showDiagram}
                        selectedGame={selectedGame}
                    />
                ))}
            </div>
        </div>
    );
}
