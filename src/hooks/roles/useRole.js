import { useSession } from "next-auth/react";

export default function useRole() {
    const session = useSession()
    const role = session.data.user.role;

    return { role }
}