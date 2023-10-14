I am storing my token that i receievd from backend in session
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { authenticate } from "@/app/(auth)/login/action";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                username: { label: "UserName", type: "text", placeholder: "Enter your username" },
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { username, email, password } = credentials;

                const user = {
                    name: username ?? '',
                    email: email,
                    password: password,
                };

                const data = await authenticate(user)
                if (data.status === 200) {
                    return {
                        username: data.data.user.name,
                        email: data.data.user.email,
                        token: data.data.token,
                        role: data.data.user.role,
                    };
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            let data = null;
            if (token && token.id !== undefined) {
                //Setting user if logged in by google
                const user = {
                    google_id: token.id,
                    name: token.name,
                    email: token.email,
                    image: token.image,
                }
                data = await authenticate(user);
            }
            if (token) {
                session.user = token;
                if (data !== null) {
                    session.user.role = data.data.user.role;
                    session.user.token = data.data.token;
                }
                session.user.isLoggedIn = true;
                return session;
            }
            return session;
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
    },
    secret: process.env.NEXTAUTH_SECRET_KEY,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET_KEY,
        encryption: true,
        maxAge: 5 * 60,
    },
    pages: {
        signIn: [
            '/login'
        ],
        error: '/register'
    },
    debug: true

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }