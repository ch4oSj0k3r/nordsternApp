import React, { useCallback, useState } from 'react'

import { addStats } from '../../helpers'

function StatsButtons({ player, setPlayers }) {
    const [loading, setLoading] = useState(false)

    const setStats = useCallback(
        async (type) => {
            setLoading(true)
            await addStats({ player, type }).then((res) => {
                setPlayers(res)
                setLoading(false)
            })
        },
        [player, setPlayers]
    )

    return (
        <div className="btn-group justify-self-center">
            <button
                className="btn text-secondary"
                onClick={() => setStats('over100')}
                disabled={loading}
            >
                100+
            </button>
            <button
                className="btn text-secondary"
                onClick={() => setStats('over140')}
                disabled={loading}
            >
                140+
            </button>
            <button
                className="btn text-secondary"
                onClick={() => setStats('over180')}
                disabled={loading}
            >
                180
            </button>
            <button
                className="btn text-secondary p-2 md:p-4"
                onClick={() => setStats('highFinish')}
                disabled={loading}
            >
                {/* <span className="block md:hidden">HF</span> */}
                {/* <span className="hidden md:block">High-Finish</span> */}
                High-Finish
            </button>
        </div>
    )
}

export default StatsButtons
