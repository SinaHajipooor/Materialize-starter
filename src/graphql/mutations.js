import gql from "graphql-tag";

export const CREATE_USER = gql`
mutation createUsers($name: String!, $email: String!, $password: String!) {
  createUser(input : {name: $name, email: $email, password: $password}) {
    id
    name
    email
  }
}`


export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $name: String! , $email: String! , $password : String!){
    updateUser( input: {
        id: $id ,
        name: $name ,
        email: $email,
        password: $password
    }){
        id 
        name 
        email
    }
}

`



// export const UPDATE_USER = gql`
// Mutations UpdateUser($id : ID! , $name :String ){
// updateUser(id : $id , name : $name){
//     id,
//     name
// }
// }
// `


// export const DELETE_USER = gql`
// Mutations DeleteUser($id : ID!){
//     deleteUser (id : $id){
//         id ,
//         name
//     }
// }

// `