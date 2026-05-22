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
        <div
            className={`gap-4 grid grid-cols-1 ${
                nextNordsternGame && 'lg:grid-cols-2'
            }`}
        >
            {nextNordsternGame && (
                <div>
                    <div className="grid grid-cols-1 gap-4">
                        <GameWidget
                            headline="Nächstes Spiel"
                            game={nextNordsternGame}
                            editable={false}
                        />
                    </div>
                </div>
            )}
            <div>
                <TableWidget table={table} />
            </div>
        </div>
    );
}
