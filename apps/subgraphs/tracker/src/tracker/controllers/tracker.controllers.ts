import type { TrpcClient } from "../../clients/trpc.js";

interface SubgraphContext {
  userId?: string;
  userRole?: string;
  trpc: TrpcClient;
}

export const trackerResolvers = {
  Query: {
    dashboard: async (_: unknown, __: unknown, context: SubgraphContext) => {
      return context.trpc.tracker.dashboard.home.summary.query();
    },
    accounts: async (_: unknown, __: unknown, context: SubgraphContext) => {
      return context.trpc.tracker.accounts.list.all.query();
    },
    account: async (
      _: unknown,
      args: { id: string },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.accounts.detail.byId.query(args);
    },
    purchases: async (
      _: unknown,
      args: { accountId?: string },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.history.browse.list.query(args);
    },
  },
  Account: {
    __resolveReference: async (
      ref: { id: string },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.accounts.detail.byId.query({ id: ref.id });
    },
    purchases: async (parent: { id: string }, _: unknown, context: SubgraphContext) => {
      return context.trpc.tracker.history.browse.list.query({
        accountId: parent.id,
      });
    },
  },
  Purchase: {
    __resolveReference: async (ref: { id: string }) => {
      return ref;
    },
  },
};
