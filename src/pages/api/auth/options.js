import CredentialsProvider from "next-auth/providers/credentials";
import axiosConfig from "src/utils/axios";

export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                const response = await axiosConfig.post('/api/auth/base/login', credentials);
                const data = response.data.result;
                if (response.status !== 200) {
                    throw new Error('Failed to login user')
                }
                const userData = data.user
                const token = data.token;
                console.log(token)

                return { ...userData, role: 'manager', token }
            }
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