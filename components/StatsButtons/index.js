'use client';

import React, { useCallback, useState } from 'react';

import { addStats } from '../../helpers';

function StatsButtons({ player, selectedGame, setPlayers }) {
    const [loading, setLoading] = useState(false);

    const setStats = useCallback(
        async (type) => {
            setLoading(true);
            await addStats({ player, type, gameId: selectedGame }).then(
                (updatedPlayer) => {
                    setPlayers((prev) =>
                        prev.map((p) =>
                            p.id === updatedPlayer.id ? updatedPlayer : p
                        )
                    );
                    setLoading(false);
                }
            );
        },
        [player, selectedGame, setPlayers]
    );

    const disabled = loading || !selectedGame;

    return (
        <div className="join justify-self-center">
            <button
                className="join-item btn btn-sm btn-outline btn-secondary"
                onClick={() => setStats('over100')}
                disabled={disabled}
            >
                {loading && (
                    <span className="loading loading-spinner loading-xs" />
                )}
                100+
            </button>
            <button
                className="join-item btn btn-sm btn-outline btn-secondary"
                onClick={() => setStats('over140')}
                disabled={disabled}
            >
                {loading && (
                    <span className="loading loading-spinner loading-xs" />
                )}
                140+
            </button>
            <button
                className="join-item btn btn-sm btn-outline btn-secondary"
                onClick={() => setStats('over180')}
                disabled={disabled}
            >
                {loading && (
                    <span className="loading loading-spinner loading-xs" />
                )}
                180
            </button>
            <button
                className="join-item btn btn-sm btn-outline btn-secondary"
                onClick={() => setStats('highFinish')}
                disabled={disabled}
            >
                {loading && (
                    <span className="loading loading-spinner loading-xs" />
                )}
                High-Finish
            </button>
        </div>
    );
}

export default StatsButtons;
