import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { authTypeDefs } from "./auth/views/auth.views.js";
import { authResolvers } from "./auth/controllers/auth.controllers.js";
import { trackerTypeDefs } from "./tracker/views/tracker.views.js";
import { trackerResolvers } from "./tracker/controllers/tracker.controllers.js";

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    { typeDefs: authTypeDefs, resolvers: authResolvers },
    { typeDefs: trackerTypeDefs, resolvers: trackerResolvers },
  ]),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env["PORT"]) || 4001 },
  context: async ({ req }) => ({
    userId: req.headers["x-user-id"] as string | undefined,
    userRole: req.headers["x-user-role"] as string | undefined,
  }),
});

console.info(`Subgraph tracker ready at ${url}`);
