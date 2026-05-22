'use client';

import React, { useCallback, useState } from 'react';
import { addStats } from '../../helpers';

function StatsButtons({ player, selectedGame, setPlayers }) {
    const [loading, setLoading] = useState(false);

    const setStats = useCallback(
        async (type) => {
            setLoading(true);
            try {
                const updatedPlayer = await addStats({
                    player,
                    type,
                    gameId: selectedGame,
                });
                setPlayers((prev) =>
                    prev.map((p) =>
                        p.id === updatedPlayer.id ? updatedPlayer : p
                    )
                );
            } catch (e) {
                console.error('Fehler beim Speichern der Statistik:', e);
            } finally {
                setLoading(false);
            }
        },
        [player, selectedGame, setPlayers]
    );

    const disabled = loading || !selectedGame;

    const buttons = [
        { label: '100+', type: 'over100' },
        { label: '140+', type: 'over140' },
        { label: '180', type: 'over180' },
        { label: 'HF', type: 'highFinish' },
    ];

    return (
        <div className="flex gap-1 flex-wrap">
            {buttons.map(({ label, type }) => (
                <button
                    key={type}
                    className="flex-1 min-w-0 btn btn-xs bg-base-300 hover:bg-primary hover:text-white border-white/10 hover:border-primary text-base-content/60 font-mono transition-all duration-150 disabled:opacity-30"
                    onClick={() => setStats(type)}
                    disabled={disabled}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-xs" />
                    ) : (
                        label
                    )}
                </button>
            ))}
        </div>
    );
}

export default StatsButtons;
