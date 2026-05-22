'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import Widget from '../..';
import StatsButtons from '../../../StatsButtons';

const BarChart = dynamic(() => import('../../../BarChart'), { ssr: false });
const RadarChart = dynamic(() => import('../../../RadarChart'), { ssr: false });

const PlayerWidget = ({
    player,
    setPlayers,
    showDiagram,
    selectedGame,
    selectedSeason,
}) => {
    const { data: session } = useSession();

    const stats = useMemo(() => {
        let stats =
            player.playerStats.filter(
                (stat) => stat.game?.matchday.seasonId === selectedSeason
            ) || [];

        if (selectedGame && player) {
            return stats.filter((stat) => stat.gameId === selectedGame);
        }

        return stats;
    }, [player, selectedGame, selectedSeason]);

    if (!player) return;

    return (
        <Widget>
            <div tabIndex={0} className="collapse collapse-arrow">
                <div className="collapse-title p-0 min-h-0">
                    <h2 className="card-title text-primary text-base font-semibold tracking-wide">
                        {`${player.firstname} ${player.lastname} (${player.playernumber})`}
                    </h2>
                </div>
                {((session && session.user) || showDiagram) && (
                    <div className="collapse-content px-0">
                        {session && session.user && (
                            <div className="grid mb-4 mt-2">
                                <StatsButtons
                                    player={player}
                                    setPlayers={setPlayers}
                                    selectedGame={selectedGame}
                                />
                            </div>
                        )}
                        {showDiagram && (
                            <div className="bg-base-300 rounded-xl p-3 mt-2">
                                <BarChart playerStats={stats} minify />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Widget>
    );
};

export default PlayerWidget;
