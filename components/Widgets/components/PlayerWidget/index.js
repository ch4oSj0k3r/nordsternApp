'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Widget from '../..';
import StatsButtons from '../../../StatsButtons';

const BarChart = dynamic(() => import('../../../BarChart'), { ssr: false });

const PlayerWidget = ({
    player,
    setPlayers,
    showDiagram,
    selectedGame,
    selectedSeason,
}) => {
    const { data: session } = useSession();

    const stats = useMemo(() => {
        let s =
            player.playerStats.filter(
                (stat) => stat.game?.matchday.seasonId === selectedSeason
            ) || [];
        if (selectedGame && player) {
            return s.filter((stat) => stat.gameId === selectedGame);
        }
        return s;
    }, [player, selectedGame, selectedSeason]);

    const totals = useMemo(() => {
        return stats.reduce(
            (acc, s) => ({
                over100: acc.over100 + (s.over100 || 0),
                over140: acc.over140 + (s.over140 || 0),
                over180: acc.over180 + (s.over180 || 0),
                highFinish: acc.highFinish + (s.highFinish || 0),
            }),
            { over100: 0, over140: 0, over180: 0, highFinish: 0 }
        );
    }, [stats]);

    if (!player) return null;

    return (
        <Widget>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h2 className="font-bold text-base text-base-content tracking-tight leading-tight">
                        {player.firstname} {player.lastname}
                    </h2>
                    <span className="text-xs text-base-content/40 font-mono">
                        #{player.playernumber}
                    </span>
                </div>
            </div>

            {/* Stats grid — always visible */}
            <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                    { label: '100+', value: totals.over100 },
                    { label: '140+', value: totals.over140 },
                    { label: '180', value: totals.over180 },
                    { label: 'HF', value: totals.highFinish },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-base-300 p-2 text-center">
                        <p
                            className={`text-xl font-bold leading-none mb-0.5 ${
                                value > 0
                                    ? 'text-primary'
                                    : 'text-base-content/20'
                            }`}
                        >
                            {value}
                        </p>
                        <p className="text-xs text-base-content/40 font-medium">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Admin: Stats buttons */}
            {session?.user && (
                <div className="mb-3">
                    <StatsButtons
                        player={player}
                        setPlayers={setPlayers}
                        selectedGame={selectedGame}
                    />
                </div>
            )}

            {/* Chart */}
            {showDiagram && (
                <div className="bg-base-300 p-3">
                    <BarChart playerStats={stats} minify />
                </div>
            )}
        </Widget>
    );
};

export default PlayerWidget;
