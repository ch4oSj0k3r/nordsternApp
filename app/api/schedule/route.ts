import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';

export async function GET() {
    try {
        const seasons = await prisma.season.findMany();
        const currentSeasonId = seasons[seasons.length - 1].id;
        const schedule = await prisma.game.findMany({
            include: { homeTeam: true, awayTeam: true, matchday: true },
            where: { matchday: { is: { seasonId: currentSeasonId } } },
        });
        return NextResponse.json(schedule);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error fetching schedule' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const schedule = await req.json();
        const seasons = await prisma.season.findMany();
        const currentSeasonId = seasons[seasons.length - 1].id;
        const games = [];

        for (const match of schedule) {
            const dateSplit = match[4].split('.');
            const d = new Date(
                `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]} ${match[5]}`
            );
            const date = d.toISOString();
            const matchday = await checkMatchday(match[0], currentSeasonId);
            const gamenumber = match[1];
            const homeId = await checkTeam(match[2], currentSeasonId);
            const awayId = await checkTeam(match[3], currentSeasonId);
            const homePoints = match[6];
            const awayPoints = match[7];
            const game = await checkGame(
                matchday,
                gamenumber,
                homeId,
                awayId,
                date,
                homePoints,
                awayPoints
            );
            games.push(game);
        }

        console.log('Import Done!!');
        return NextResponse.json(games);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error importing schedule' },
            { status: 500 }
        );
    }
}

const checkTeam = async (teamName: string, seasonId: number) => {
    let team = await prisma.team.findFirst({
        where: { name: teamName, seasons: { some: { id: seasonId } } },
    });

    if (!team) {
        team = await prisma.team.findFirst({ where: { name: teamName } });
        if (!team) {
            team = await prisma.team.create({
                data: {
                    name: teamName,
                    seasons: { connect: { id: seasonId } },
                },
            });
        } else {
            team = await prisma.team.update({
                where: { name: teamName },
                data: { seasons: { connect: { id: seasonId } } },
            });
        }
    }
    return team.id;
};

const checkMatchday = async (matchdaynumber: number, seasonId: number) => {
    let matchday = await prisma.matchday.findFirst({
        where: { matchday: matchdaynumber, seasonId },
    });
    if (!matchday) {
        matchday = await prisma.matchday.create({
            data: { matchday: matchdaynumber, seasonId },
        });
    }
    return matchday.id;
};

const checkGame = async (
    matchdayId: number,
    gamenumber: number,
    homeId: number,
    awayId: number,
    date: string,
    homePoints: number,
    awayPoints: number
) => {
    let game = await prisma.game.findFirst({
        where: { matchdayId, gamenumber },
    });
    if (!game) {
        game = await prisma.game.create({
            data: {
                matchdayId,
                gamenumber,
                homeTeamId: homeId,
                awayTeamId: awayId,
                date,
                homePoints,
                awayPoints,
            },
        });
    } else if (
        date !== game.date ||
        homePoints !== game.homePoints ||
        awayPoints !== game.awayPoints
    ) {
        game = await prisma.game.update({
            where: { UniqueMatchdayGamenumber: { matchdayId, gamenumber } },
            data: { date, homePoints, awayPoints },
        });
    }
    return game;
};
