import type { TrpcClient } from "../../clients/trpc.js";

interface SubgraphContext {
  userId?: string;
  userRole?: string;
  trpc: TrpcClient;
}

export const authResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: SubgraphContext) => {
      return context.trpc.auth.me.query();
    },
  },
  User: {
    __resolveReference: async (ref: { id: string }) => {
      return ref;
    },
  },
};
