// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { token } = req.body;
//         console.log(token)
//     }
// }

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "./options";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // get sessions 
            const session = await getServerSession(req, res, options)

            // extract api token
            const token = session?.user?.apiToken;

            res.status(200).json({
                message: 'token has been get successfully', apiToken: token
            })
        } catch (error) {
            res.status(400).json({
                message: 'couldnt get token from session',
                status: false
            })
        }
    }
}