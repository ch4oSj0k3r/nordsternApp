import NextAuth from 'next-auth';
import type { DefaultSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from './prisma/prisma';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            username?: string | null;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        username?: string | null;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Passwort', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password)
                    return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username as string },
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
                    (await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    ))
                ) {
                    const { password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.id) session.user.id = token.id;
            if (token.username !== undefined)
                session.user.username = token.username;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = (
                    user as { username?: string | null }
                ).username;
            }
            return token;
        },
    },
});
