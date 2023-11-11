import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from "src/graphql/resolvers";
import { typeDefs } from "src/graphql/schema";


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
    context: async (req, res) => ({ req, res })
});