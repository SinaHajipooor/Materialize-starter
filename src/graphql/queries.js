import { gql } from "apollo-server-micro";

// get all users 
export const GET_USERS = gql`
query GetUsers {
    users {
        id
        name
    }
}`;


// get user detail
export const GET_USER = gql`
  query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
  }
}`;