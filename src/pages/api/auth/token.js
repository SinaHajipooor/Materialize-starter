import { NextRequest, NextResponse } from "next/server";

export default function handler(response, request) {

    // save token 
    if (request.method === 'POST') {
        try {
            const { token } = request.body;
            response.cookies.set('token', token, { httpOnly: true, maxAge: 60 * 60 * 2 });

            return NextResponse.json({
                message: 'token has been saved successfully',
                status: true
            })
        } catch (error) {
            return NextResponse.json({
                message: error.message,
                status: false
            })
        }
    }

    // get token 
    if (request.method === 'GET') {
        try {
            const token = response.cookies.get('token')

            return NextResponse.json({
                message: 'token get successfully',
                status: true,
                token: token
            })
        } catch (error) {
            return NextResponse.json({
                message: error.message,
                status: false
            })
        }
    }

    // delete token
    if (request.method === 'DELETE') {
        try {
            response.cookies.delete('token');

            return NextResponse.json({
                message: 'token has been deleted successfully',
                status: true
            })
        } catch (error) {
            return NextResponse.json({
                messgae: error.message
            })
        }
    }

}