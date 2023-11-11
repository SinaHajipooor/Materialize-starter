import { createUser, getUser, getUsers, updateUser } from "src/lib/users/users";

export const resolvers = {
    Query: {
        users: getUsers,
        user: (args) => getUser(args.id)
    },
    Mutations: {
        createUser: createUser,
        updateUser: updateUser,
    }
}