import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import apiLogin from "src/api/auth/login";


export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                const response = await apiLogin(credentials);
                const userData = response.data.result.user;
                const apiToken = response.data.result.token;

                return { ...userData, role: 'manager', apiToken: apiToken }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {

            return {
                ...session, user: token
            }
        },

        async jwt({ token, user }) {

            if (user) {
                return {
                    ...token, ...user
                }
            }

            return token
        },
    },
    pages: {
        signIn: '/login',
    },

}



