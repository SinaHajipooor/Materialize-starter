import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function resolver(req, res) {
    const handler = NextAuth({
        providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {},
                async authorize(credentials) {
                    const user = { id: 1, username: 'sina', first_name: 'sina', last_name: 'hajipour', mobile: '09155613393', password: '123', role: 'admin', avatar: '', status: '' };
                    if (credentials?.username === user.username && credentials?.password === user.password) {
                        return user
                    } else {
                        return null;
                    }
                },
            }),
        ],
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    return {
                        ...token, ...user
                    }
                }

                return token
            },
            async session({ session, token }) {
                return {
                    ...session, user: token
                }
            },
        },
        pages: {
            signIn: "/login",
        },
    });

    await handler(req, res);
}