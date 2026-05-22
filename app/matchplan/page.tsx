import prisma from '../../prisma/prisma';
import { activeTeamId } from '../../helpers';
import MatchplanClient from './MatchplanClient';

export default async function MatchplanPage() {
    const seasons = await prisma.season.findMany();
    const currentSeasonId = seasons[seasons.length - 1].id;

    const matchplan = await prisma.matchday.findMany({
        include: {
            games: { include: { homeTeam: true, awayTeam: true } },
        },
        where: { seasonId: currentSeasonId },
    });

    const today = new Date().toISOString();
    const nextNordsternGame = await prisma.game.findFirst({
        where: {
            OR: [{ homeTeamId: activeTeamId }, { awayTeamId: activeTeamId }],
            date: { gte: today },
        },
        include: { matchday: true },
        orderBy: { date: 'asc' },
    });

    const currentMatchday = nextNordsternGame?.matchday?.matchday ?? 1;

    return (
        <MatchplanClient
            matchplan={matchplan}
            currentMatchday={currentMatchday}
        />
    );
}
