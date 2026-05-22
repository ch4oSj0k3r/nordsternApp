import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const withStats = searchParams.get('withStats');

        const players = withStats
            ? await prisma.player.findMany({
                  where: { active: true },
                  include: { playerStats: true },
              })
            : await prisma.player.findMany({ where: { active: true } });

        return NextResponse.json(players);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error fetching players' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const player = await req.json();

        const team = await prisma.team.findFirst({
            where: { name: { contains: player.team } },
        });

        if (!team) {
            return NextResponse.json(
                { error: 'Team not exists' },
                { status: 500 }
            );
        }

        delete player.team;
        await prisma.player.create({ data: { ...player, teamId: team.id } });
        const players = await prisma.player.findMany({});
        return NextResponse.json(players);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error creating player' },
            { status: 500 }
        );
    }
}
