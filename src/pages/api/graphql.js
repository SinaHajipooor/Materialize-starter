import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../schemas/schemas";
import { resolvers } from "../../resolvers/resolvers";

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

await apolloServer.start();

export default apolloServer.createHandler({ path: "/api/graphql" });
