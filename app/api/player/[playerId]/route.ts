import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ playerId: string }> }
) {
    try {
        const { playerId } = await params;
        if (!playerId) {
            return NextResponse.json(
                { error: 'Player not exists' },
                { status: 500 }
            );
        }
        await prisma.player.delete({ where: { id: parseInt(playerId) } });
        const players = await prisma.player.findMany({});
        return NextResponse.json(players);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error deleting player' },
            { status: 500 }
        );
    }
}
