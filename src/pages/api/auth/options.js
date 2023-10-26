import CredentialsProvider from "next-auth/providers/credentials";
import apiLogin from "src/api/auth/apiAuth";


export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                const response = await apiLogin(credentials);
                const userData = response.data.result.user;
                const apiToken = response.data.result.token;

                return { ...userData, role: 'user', apiToken: apiToken }
            },

        }),
    ],
    callbacks: {
        async session({ session, token }) {

            const myToken = token.apiToken
            session.myToken = myToken

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
    session: {
        maxAge: 60 * 60 * 2
    },
}



