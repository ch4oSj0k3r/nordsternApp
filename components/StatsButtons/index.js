import React, { useCallback, useState } from 'react';

import { addStats } from '../../helpers';

function StatsButtons({ player, selectedGame, setPlayers }) {
    const [loading, setLoading] = useState(false);

    const setStats = useCallback(
        async (type) => {
            setLoading(true);
            await addStats({ player, type, gameId: selectedGame }).then(
                (res) => {
                    setPlayers(res);
                    setLoading(false);
                }
            );
        },
        [player, selectedGame, setPlayers]
    );

    const disabled = loading || !selectedGame;

    return (
        <div className="btn-group justify-self-center">
            <button
                className="btn text-nsBrown"
                onClick={() => setStats('over100')}
                disabled={disabled}
            >
                100+
            </button>
            <button
                className="btn text-nsBrown"
                onClick={() => setStats('over140')}
                disabled={disabled}
            >
                140+
            </button>
            <button
                className="btn text-nsBrown"
                onClick={() => setStats('over180')}
                disabled={disabled}
            >
                180
            </button>
            <button
                className="btn text-nsBrown p-2 md:p-4"
                onClick={() => setStats('highFinish')}
                disabled={disabled}
            >
                High-Finish
            </button>
        </div>
    );
}

export default StatsButtons;
