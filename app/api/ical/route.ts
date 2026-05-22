import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';
import ical from 'ical-generator';

export async function GET() {
    try {
        const seasons = await prisma.season.findMany();
        const currentSeasonId = seasons[seasons.length - 1].id;
        const schedule = await prisma.game.findMany({
            include: { homeTeam: true, awayTeam: true, matchday: true },
            where: { matchday: { is: { seasonId: currentSeasonId } } },
        });

        const calendar = ical({ name: seasons[seasons.length - 1].name });

        schedule.forEach((game) => {
            if (
                game.homeTeam.name === 'Team Nordstern' ||
                game.awayTeam.name === 'Team Nordstern'
            ) {
                const startTime = new Date(game.date);
                const endTime = new Date(game.date);
                endTime.setHours(startTime.getHours() + 3);
                calendar.createEvent({
                    start: startTime,
                    end: endTime,
                    timezone: 'Europe/Berlin',
                    summary: `${game.homeTeam.name} : ${game.awayTeam.name}`,
                });
            }
        });

        return new Response(calendar.toString(), {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="calendar.ics"',
            },
        });
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error generating ical' },
            { status: 500 }
        );
    }
}
