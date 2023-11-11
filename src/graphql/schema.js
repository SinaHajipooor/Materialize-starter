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


type Mutations {
    createUser (name: String!, email: String!, password: String!): User
    updateUser (id: ID! , name: String , email: String , password: String) : User
}
`;



// // // //------------------------------------
