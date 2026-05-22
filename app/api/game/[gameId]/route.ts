import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '../../../../prisma/prisma';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ gameId: string }> }
) {
    try {
        const { gameId } = await params;
        const { homePoints, awayPoints } = await req.json();

        if (homePoints && awayPoints) {
            await prisma.game.update({
                where: { id: parseInt(gameId) },
                data: {
                    homePoints: parseInt(homePoints),
                    awayPoints: parseInt(awayPoints),
                },
            });
            revalidatePath('/');
            revalidatePath('/matchplan');
            return NextResponse.json({});
        } else {
            return NextResponse.json(
                { error: 'Points are missing' },
                { status: 500 }
            );
        }
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error updating game' },
            { status: 500 }
        );
    }
}
