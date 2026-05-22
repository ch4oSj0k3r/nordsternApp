import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = await prisma.user.create({
            data: {
                ...body,
                password: await bcrypt.hash(body.password, 12),
            },
        });
        return NextResponse.json(user);
    } catch (e) {
        console.error('Request error', e);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        );
    }
}
