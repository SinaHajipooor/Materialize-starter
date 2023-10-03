import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(request) {
        // admin middleware
        if (request.nextUrl.pathname.startsWith('/authorize/admin') && request.nextauth.token?.role !== 'admin') {
            return NextResponse.rewrite(
                new URL('/401', request.url)
            )
        }

        // client middleware
        if (request.nextUrl.pathname.startsWith('/authorize/user') && request.nextauth.token?.role !== 'user') {
            return NextResponse.rewrite(
                new URL('/401', request.url)
            )
        }

        // manager middleware
        if (request.nextUrl.pathname.startsWith('/authorize/manager') && request.nextauth.token?.role !== 'manager') {
            return NextResponse.rewrite(
                new URL('/401', request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => token?.role === 'user' || token?.role === 'admin' || token?.role === 'manager',
        },
    }
)


export const config = {
    matcher: ['/', '/home', '/authorize/admin/:path*', '/authorize/user/:path*', '/authorize/manager/:path*']
}