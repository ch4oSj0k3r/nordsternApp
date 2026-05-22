'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { GiCalendar } from 'react-icons/gi';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Prisma } from '@prisma/client';
import GameWidget from '../../components/Widgets/components/GameWidget';

type GameWithTeams = Prisma.GameGetPayload<{
    include: { homeTeam: true; awayTeam: true };
}>;

type MatchdayWithGames = Prisma.MatchdayGetPayload<{
    include: { games: { include: { homeTeam: true; awayTeam: true } } };
}>;

interface Props {
    matchplan: MatchdayWithGames[];
    currentMatchday: number;
}

export default function MatchplanClient({ matchplan, currentMatchday }: Props) {
    const { data: session } = useSession();
    const [matchday, setMatchday] = useState(currentMatchday);
    const [games, setGames] = useState<GameWithTeams[]>([]);

    useEffect(() => {
        const md = matchplan.find((md) => md.matchday === matchday);
        setGames(md?.games ?? []);
    }, [matchplan, matchday]);

    const goPrevious = () =>
        setMatchday((prev) => (prev === 1 ? matchplan.length : prev - 1));
    const goNext = () =>
        setMatchday((prev) => (prev === matchplan.length ? 1 : prev + 1));

    return (
        <div className="p-4 lg:p-6">
            {/* Page header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-base-content">
                        Spielplan
                    </h1>
                    <p className="text-sm text-base-content/40 mt-0.5">
                        Spieltag {matchday} von {matchplan.length}
                    </p>
                </div>
                <Link
                    href="/api/ical"
                    className="flex items-center gap-1.5 text-xs text-base-content/40 hover:text-primary transition-colors mt-1"
                >
                    <GiCalendar className="h-4 w-4" />
                    Export
                </Link>
            </div>

            {/* Mobile navigation */}
            <div className="flex lg:hidden items-center justify-between mb-6">
                <button
                    className="btn btn-sm bg-base-200 border-white/10 hover:bg-base-300 hover:border-primary/30 text-base-content/60"
                    onClick={goPrevious}
                >
                    <MdChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-base-content">
                    Spieltag {matchday}{' '}
                    <span className="text-base-content/30">
                        / {matchplan.length}
                    </span>
                </span>
                <button
                    className="btn btn-sm bg-base-200 border-white/10 hover:bg-base-300 hover:border-primary/30 text-base-content/60"
                    onClick={goNext}
                >
                    <MdChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Desktop navigation — pill row */}
            <div className="hidden lg:flex items-center gap-2 mb-6 overflow-x-auto pb-1">
                <button
                    className="btn btn-sm bg-base-200 border-white/10 hover:bg-base-300 hover:border-primary/30 text-base-content/60 flex-shrink-0"
                    onClick={goPrevious}
                >
                    <MdChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-1.5 flex-nowrap">
                    {matchplan.map((md) => (
                        <button
                            key={md.matchday}
                            onClick={() => setMatchday(md.matchday)}
                            className={`flex-shrink-0 w-9 h-9 text-xs font-bold transition-all duration-150 ${
                                md.matchday === matchday
                                    ? 'bg-primary text-white glow-primary-sm'
                                    : 'bg-base-200 text-base-content/40 hover:bg-base-300 hover:text-base-content border border-white/5'
                            }`}
                        >
                            {md.matchday}
                        </button>
                    ))}
                </div>

                <button
                    className="btn btn-sm bg-base-200 border-white/10 hover:bg-base-300 hover:border-primary/30 text-base-content/60 flex-shrink-0"
                    onClick={goNext}
                >
                    <MdChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Games */}
            <div className="grid grid-cols-1 gap-3">
                {games.map((game) => (
                    <GameWidget
                        key={game.id}
                        headline={`Spiel ${game.gamenumber}`}
                        game={game}
                        editable={!!(session && session.user)}
                    />
                ))}
            </div>
        </div>
    );
}
