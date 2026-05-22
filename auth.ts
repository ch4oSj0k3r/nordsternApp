import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import sha256 from 'crypto-js/sha256';
import prisma from './prisma/prisma';

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
                    user &&
                    user.password ===
                        sha256(credentials.password as string).toString()
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
            (session as any).accessToken = (token as any).accessToken;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                (token as any).user = user;
            }
            return token;
        },
    },
});
