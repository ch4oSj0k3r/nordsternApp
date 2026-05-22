'use client';

import React, { useMemo, useState } from 'react';
import { activeTeamId } from '../../helpers';
import PlayerWidget from '../../components/Widgets/components/PlayerWidget';

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

    const visiblePlayers = useMemo(() => {
        return players.filter((player) => !hiddenPlayers.includes(player.id));
    }, [hiddenPlayers, players]);

    const playerOptions = useMemo(() => {
        return players.map((player) => (
            <li key={player.id}>
                <a className="flex">
                    <div className="flex-1">
                        {player.firstname} {player.lastname}
                    </div>
                    <div className="flex-none">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary checkbox-sm"
                            checked={!hiddenPlayers.includes(player.id)}
                            onChange={() => togglePlayer(player.id)}
                        />
                    </div>
                </a>
            </li>
        ));
    }, [hiddenPlayers, players]);

    const gameOptions = useMemo(() => {
        return nordsternGames.map((game) => {
            const opponentName =
                game.homeTeam.id !== activeTeamId
                    ? game.homeTeam.name
                    : game.awayTeam.name;
            return (
                <option key={game.id} value={game.id}>
                    {opponentName}
                </option>
            );
        });
    }, [nordsternGames]);

    const togglePlayer = (id: number) => {
        setHiddenPlayers((prev) => {
            const idx = prev.indexOf(id);
            return idx > -1 ? prev.filter((p) => p !== id) : [...prev, id];
        });
    };

    return (
        <div className="p-4 grid gap-4">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                    <select
                        className="select select-bordered select-sm focus:outline-none focus:border-primary"
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
                        className="select select-bordered select-sm focus:outline-none focus:border-primary"
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
                </div>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm btn-outline btn-accent"
                    >
                        Filter
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 border border-base-content/10 rounded-box w-56 mt-1"
                    >
                        {playerOptions}
                        <li className="divider my-1" />
                        <li>
                            <a className="flex">
                                <div className="flex-1 text-sm">
                                    Diagramm anzeigen
                                </div>
                                <div className="flex-none">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary checkbox-sm"
                                        checked={showDiagram}
                                        onChange={() =>
                                            setShowDiagram(!showDiagram)
                                        }
                                    />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
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
