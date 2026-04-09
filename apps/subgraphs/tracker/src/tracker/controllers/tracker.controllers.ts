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
      const result = await context.trpc.tracker.history.browse.list.query(args);
      return result.items;
    },
  },
  Mutation: {
    createAccount: async (
      _: unknown,
      args: { input: { storeName: string; saName?: string; notes?: string } },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.accounts.list.create.mutate(args.input);
    },
    updateAccount: async (
      _: unknown,
      args: {
        input: {
          id: string;
          storeName?: string;
          saName?: string;
          notes?: string;
        };
      },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.accounts.detail.update.mutate(args.input);
    },
    deleteAccount: async (
      _: unknown,
      args: { id: string },
      context: SubgraphContext,
    ) => {
      const result = await context.trpc.tracker.accounts.detail.delete.mutate({
        id: args.id,
      });
      return result.success;
    },
    createPurchase: async (
      _: unknown,
      args: { input: Record<string, unknown> },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.purchases.manage.create.mutate(
        args.input as Parameters<
          typeof context.trpc.tracker.purchases.manage.create.mutate
        >[0],
      );
    },
    updatePurchase: async (
      _: unknown,
      args: { input: Record<string, unknown> },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.purchases.manage.update.mutate(
        args.input as Parameters<
          typeof context.trpc.tracker.purchases.manage.update.mutate
        >[0],
      );
    },
    deletePurchase: async (
      _: unknown,
      args: { id: string },
      context: SubgraphContext,
    ) => {
      const result = await context.trpc.tracker.purchases.manage.delete.mutate({
        id: args.id,
      });
      return result.success;
    },
  },
  Account: {
    __resolveReference: async (
      ref: { id: string },
      context: SubgraphContext,
    ) => {
      return context.trpc.tracker.accounts.detail.byId.query({ id: ref.id });
    },
    purchases: async (
      parent: { id: string },
      _: unknown,
      context: SubgraphContext,
    ) => {
      const result = await context.trpc.tracker.history.browse.list.query({
        accountId: parent.id,
      });
      return result.items;
    },
  },
  Purchase: {
    __resolveReference: async (ref: { id: string }) => {
      return ref;
    },
  },
};
