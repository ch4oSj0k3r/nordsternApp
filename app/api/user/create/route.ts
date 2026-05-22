import { NextRequest, NextResponse } from 'next/server';
import sha256 from 'crypto-js/sha256';
import prisma from '../../../../prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = await prisma.user.create({
            data: {
                ...body,
                password: sha256(body.password).toString(),
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
