import NextAuth from "next-auth";
import { options } from "./options";

export default async function resolver(req, res) {
    const handler = NextAuth(options);
    await handler(req, res);
}

export { resolver as GET, resolver as POST };