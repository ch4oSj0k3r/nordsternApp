import { Prisma } from '@prisma/client';

export const activeTeamId = 6;

export type GameForTable = Prisma.GameGetPayload<{
    include: { homeTeam: true; awayTeam: true };
}> & { matchday?: { seasonId: number } };

export type TableRow = {
    place: number;
    id: number;
    name: string;
    games: number;
    points: number;
    wins: number;
    losses: number;
    winGames: number;
    lossGames: number;
    diffGames: number;
};

export const getTable = (games: GameForTable[]): TableRow[] => {
    let table: Omit<TableRow, 'place'>[] = [];
    games.forEach((game) => {
        let homePoints = 0;
        let awayPoints = 0;

        if (game.homePoints && game.awayPoints) {
            if (game.homePoints > game.awayPoints) {
                if (game.awayPoints < 10) {
                    homePoints = 3;
                } else {
                    homePoints = 2;
                    awayPoints = 1;
                }
            } else {
                if (game.homePoints < 10) {
                    awayPoints = 3;
                } else {
                    awayPoints = 2;
                    homePoints = 1;
                }
            }
        }
        let homeIndex = table.findIndex((team) => team.id === game.homeTeamId);
        if (homeIndex != -1) {
            let home = table[homeIndex];
            home.points += game.penalty ? 0 : homePoints;
            home.games += homePoints || awayPoints ? 1 : 0;
            home.wins += homePoints >= 2 ? 1 : 0;
            home.losses += awayPoints >= 2 ? 1 : 0;
            home.winGames += game.homePoints ?? 0;
            home.lossGames += game.awayPoints ?? 0;
            home.diffGames += (game.homePoints ?? 0) - (game.awayPoints ?? 0);
        } else {
            table.push({
                id: game.homeTeamId,
                name: game.homeTeam.name,
                games: homePoints || awayPoints ? 1 : 0,
                points: game.penalty ? 0 : homePoints,
                wins: homePoints >= 2 ? 1 : 0,
                losses: awayPoints >= 2 ? 1 : 0,
                winGames: game.homePoints ?? 0,
                lossGames: game.awayPoints ?? 0,
                diffGames: (game.homePoints ?? 0) - (game.awayPoints ?? 0),
            });
        }
        let awayIndex = table.findIndex((team) => team.id === game.awayTeamId);
        if (awayIndex != -1) {
            let away = table[awayIndex];
            away.points += game.penalty ? 0 : awayPoints;
            away.games += homePoints || awayPoints ? 1 : 0;
            away.wins += awayPoints >= 2 ? 1 : 0;
            away.losses += homePoints >= 2 ? 1 : 0;
            away.winGames += game.awayPoints ?? 0;
            away.lossGames += game.homePoints ?? 0;
            away.diffGames += (game.awayPoints ?? 0) - (game.homePoints ?? 0);
        } else {
            table.push({
                id: game.awayTeamId,
                name: game.awayTeam.name,
                games: homePoints || awayPoints ? 1 : 0,
                points: game.penalty ? 0 : awayPoints,
                wins: awayPoints >= 2 ? 1 : 0,
                losses: homePoints >= 2 ? 1 : 0,
                winGames: game.awayPoints ?? 0,
                lossGames: game.homePoints ?? 0,
                diffGames: (game.awayPoints ?? 0) - (game.homePoints ?? 0),
            });
        }
    });

    table.sort((i, j) => {
        if (i.points > j.points) return -1;
        if (i.points < j.points) return 1;
        if (i.games > j.games) return -1;
        if (i.games < j.games) return 1;
        if (i.diffGames < j.diffGames) return 1;
        if (i.diffGames > j.diffGames) return -1;
        return i.winGames > j.winGames ? -1 : 1;
    });

    return table.map((team, index) => ({ place: index + 1, ...team }));
};

export const addStats = (data: {
    player: { id: number };
    type: string;
    gameId: number | null;
}): Promise<unknown> => {
    return fetch(`/api/playerStats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then((res) => res.json());
};

export const updateGame = (
    gameId: number,
    data: {
        homePoints: string | number | undefined;
        awayPoints: string | number | undefined;
    }
): Promise<Response> => {
    return fetch(`/api/game/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};
