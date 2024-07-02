import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { sanityClient } from '../../../lib/sanity';

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            authorize: async (credentials) => {
                const user = await sanityClient.fetch(
                    `*[_type == "user" && email == $email && password == $password][0]`,
                    { email: credentials.email, password: credentials.password }
                );
                if (user) {
                    return { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
    },
    callbacks: {
        async session(session, token) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin;
            return session;
        },
        async jwt(token, user) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
    },
});
