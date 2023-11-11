import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CREATE_USER, UPDATE_USER } from 'src/graphql/mutations';
import { GET_USER, GET_USERS } from 'src/graphql/queries';


const client = new ApolloClient({
    uri: 'http://192.168.2.102:85/graphql',
    cache: new InMemoryCache(),
});


// fetch all users
export async function getUsers() {
    const { data } = await client.query({
        query: GET_USERS
    });

    return data.users
}

// fetch user detail
export async function getUser(id) {
    const { data } = await client.query({
        query: GET_USER,
        variables: { "id": id },

    });

    return data.user;
}

//create new user 
export async function createUser() {
    const userData = {
        "name": "sina",
        "email": "sinao,losdsad1@gmail.com",
        "password": "1234"
    };

    const { data } = await client.mutate({
        mutation: CREATE_USER,
        variables: userData
    });

    return data.createUser

}

// update user 
export async function updateUser() {
    const userData = {
        "id": "41",
        "name": "sina",
        "email": "sinasgdf@gmail.com",
        "password": "1234"

    };

    const { data } = await client.mutate({
        mutation: UPDATE_USER,
        variables: userData
    });

    console.log(data)

    return data.updateUser
}