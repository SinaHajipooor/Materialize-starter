import { gql } from "apollo-server-micro";

export const typeDefs = gql`
 type User {
    id: ID
    name : String
 }

type Query {
    users: [User]!
    user(id: ID!): User
}


type Mutation {
    createUser (name: String!, email: String!, password: String!): User
    updateUser (id: ID! , name: String , email: String , password: String) : User
}
`;


// // //------------------------------------
// export const typeDefs = `#graphql


// type User {
//     id: String
//     name:  String
// }


// type Query {
//     getUser(id: ID): User
//     getUsers : [User]
// }

// type Mutations {
//     createUser(name: String) : User
//     updateUser(id: ID, name : String): User
//     deleteUser(id: ID): User
// }


// `;