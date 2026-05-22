import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const user = await prisma.user.findUnique({
            where: { username: body.username },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                image: true,
                password: true,
            },
        });

        if (
            user?.password &&
            (await bcrypt.compare(body.password, user.password))
        ) {
            const { password, ...userWithoutPassword } = user;
            return NextResponse.json(userWithoutPassword);
        } else {
            return new Response('Invalid credentials', { status: 400 });
        }
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error checking credentials' },
            { status: 500 }
        );
    }
}
