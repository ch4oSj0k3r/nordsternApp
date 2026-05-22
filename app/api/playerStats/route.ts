import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';

const defaultVal = {
    over100: 0,
    over140: 0,
    over180: 0,
    highFinish: 0,
};

export async function GET() {
    try {
        const stats = await prisma.playerStats.findMany({
            include: { player: true },
        });
        return NextResponse.json(stats);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error fetching stats' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { player, type, gameId } = await req.json();

        await prisma.playerStats.upsert({
            where: {
                UniqueGamePlayer: {
                    playerId: player.id,
                    gameId: gameId,
                },
            },
            create: {
                ...defaultVal,
                [type]: 1,
                player: { connect: { id: player.id } },
                game: { connect: { id: gameId } },
            },
            update: {
                [type]: { increment: 1 },
            },
        });

        const updatedPlayer = await prisma.player.findFirst({
            where: { id: player.id },
            include: {
                playerStats: {
                    include: {
                        game: { include: { matchday: true } },
                    },
                },
            },
        });

        return NextResponse.json(updatedPlayer);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error updating stats' },
            { status: 500 }
        );
    }
}
