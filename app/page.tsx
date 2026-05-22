import prisma from '../prisma/prisma';
import { activeTeamId, getTable } from '../helpers';
import TableWidget from '../components/Widgets/components/TableWidget';
import GameWidget from '../components/Widgets/components/GameWidget';

export default async function Dashboard() {
    const seasons = await prisma.season.findMany();
    const currentSeasonId = seasons[seasons.length - 1].id;

    const games = await prisma.game.findMany({
        include: { homeTeam: true, awayTeam: true, matchday: true },
        where: { matchday: { is: { seasonId: currentSeasonId } } },
    });
    const table = getTable(games);

    const today = new Date().toISOString();
    const nextNordsternGame = await prisma.game.findFirst({
        where: {
            OR: [{ homeTeamId: activeTeamId }, { awayTeamId: activeTeamId }],
            date: { gte: today },
        },
        include: { homeTeam: true, awayTeam: true },
        orderBy: { date: 'asc' },
    });

    return (
        <div className="p-4 lg:p-6">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-base-content">
                    Dashboard
                </h1>
                <p className="text-sm text-base-content/40 mt-0.5">
                    Saison-Übersicht
                </p>
            </div>

            {/* Hero: next game */}
            {nextNordsternGame && (
                <div className="mb-6">
                    <GameWidget
                        headline="Nächstes Spiel"
                        game={nextNordsternGame}
                        editable={false}
                        hero
                    />
                </div>
            )}

            {/* Table */}
            <TableWidget table={table} />
        </div>
    );
}
