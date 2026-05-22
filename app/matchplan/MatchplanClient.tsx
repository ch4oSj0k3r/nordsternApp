'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { GiCalendar, GiNextButton, GiPreviousButton } from 'react-icons/gi';

import GameWidget from '../../components/Widgets/components/GameWidget';

interface Game {
    id: number;
    gamenumber: number;
    homeTeam: { id: number; name: string };
    awayTeam: { id: number; name: string };
    date: string;
    homePoints?: number | null;
    awayPoints?: number | null;
}

interface Matchday {
    matchday: number;
    games: Game[];
}

interface Props {
    matchplan: Matchday[];
    currentMatchday: number;
}

export default function MatchplanClient({ matchplan, currentMatchday }: Props) {
    const { data: session } = useSession();
    const [matchday, setMatchday] = useState(currentMatchday);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const md = matchplan.find((md) => md.matchday === matchday);
        setGames(md?.games ?? []);
    }, [matchplan, matchday]);

    const goCurrent = () => setMatchday(currentMatchday);
    const goPrevious = () =>
        setMatchday((prev) => (prev === 1 ? matchplan.length : prev - 1));
    const goNext = () =>
        setMatchday((prev) => (prev === matchplan.length ? 1 : prev + 1));

    return (
        <div className="p-4 grid grid-cols-1 gap-4">
            <div className="flex justify-center">
                <div className="join">
                    <button
                        className="join-item btn btn-ghost"
                        onClick={goPrevious}
                    >
                        <GiPreviousButton className="h-5 w-5" />
                    </button>
                    <button
                        className="join-item btn btn-primary min-w-28"
                        onClick={goCurrent}
                    >
                        Spieltag {matchday}
                    </button>
                    <Link href="/api/ical" passHref legacyBehavior>
                        <button className="join-item btn btn-ghost">
                            <GiCalendar className="h-5 w-5 mr-1" />
                            Export
                        </button>
                    </Link>
                    <button
                        className="join-item btn btn-ghost"
                        onClick={goNext}
                    >
                        <GiNextButton className="h-5 w-5" />
                    </button>
                </div>
            </div>
            {games.map((game) => (
                <GameWidget
                    key={game.id}
                    headline={`Spiel ${game.gamenumber}`}
                    game={game}
                    editable={!!(session && session.user)}
                />
            ))}
        </div>
    );
}
