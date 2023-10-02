import CredentialsProvider from "next-auth/providers/credentials";


export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                // const response = await axiosConfig.post('/api/auth/base/login', credentials);
                // const data = response.data.result;
                // if (response.status !== 200) {
                //     throw new Error('Failed to login user')
                // }
                // const userData = data.user
                // return { ...userData, role: 'admin' }
                // -------- test ----------
                const user = { id: 1, username: 'sina', first_name: 'سینا', last_name: 'حاجی پور', mobile: '09155613393', password: '123', role: 'admin', avatar: '', status: '' };
                if (credentials?.username === user.username && credentials?.password === user.password) {
                    return user
                } else {
                    return null;
                }
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
        }
    },
    pages: {
        signIn: '/login',
    }
}