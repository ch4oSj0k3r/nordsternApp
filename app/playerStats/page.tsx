import prisma from '../../prisma/prisma';
import { activeTeamId } from '../../helpers';
import PlayerStatsClient from './PlayerStatsClient';

export default async function PlayerStatsPage() {
    const seasons = await prisma.season.findMany();
    const currentSeasonId = seasons[seasons.length - 1].id;

    const initPlayers = await prisma.player.findMany({
        where: { teamId: activeTeamId, active: true },
        include: {
            playerStats: {
                include: {
                    game: { include: { matchday: true } },
                },
            },
        },
    });

    const nordsternGames = await prisma.game.findMany({
        where: {
            OR: [{ homeTeamId: activeTeamId }, { awayTeamId: activeTeamId }],
            AND: [{ matchday: { is: { seasonId: currentSeasonId } } }],
        },
        include: { homeTeam: true, awayTeam: true, matchday: true },
    });

    return (
        <PlayerStatsClient
            currentSeasonId={currentSeasonId}
            seasons={seasons}
            initPlayers={initPlayers}
            nordsternGames={nordsternGames}
        />
    );
}
