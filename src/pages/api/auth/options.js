import CredentialsProvider from "next-auth/providers/credentials";
import apiLogin from "src/api/auth/login";

export const options = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                const response = await apiLogin(credentials);
                const userData = response.data.result.user;

                return { ...userData, role: 'manager' }
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
        signIn: '/login',
    }
}