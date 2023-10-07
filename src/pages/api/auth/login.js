import { NextResponse } from "next/server";

// set api token in cookie
export default async function handler(request) {

    const reqBody = await request.json();

    //     extract token 
    const { token } = reqBody;

    const response = NextResponse.json({
        message: 'token has been saved successfully',
        status: true
    });

    response.cookies.set('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 })

    return response;
}