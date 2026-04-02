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
  Mutation: {
    createAccount: async (
      _: unknown,
      _args: { input: { storeName: string; saName?: string; notes?: string } },
    ) => {
      // TODO: delegate to trpc.tracker.accounts.create.mutate()
      return {
        id: "new-account",
        storeName: "",
        saName: null,
        notes: null,
        createdAt: new Date().toISOString(),
        purchases: [],
      };
    },
    updateAccount: async (
      _: unknown,
      _args: {
        input: {
          id: string;
          storeName?: string;
          saName?: string;
          notes?: string;
        };
      },
    ) => {
      // TODO: delegate to trpc.tracker.accounts.update.mutate()
      return {
        id: _args.input.id,
        storeName: "",
        saName: null,
        notes: null,
        createdAt: new Date().toISOString(),
        purchases: [],
      };
    },
    deleteAccount: async (_: unknown, _args: { id: string }) => {
      // TODO: delegate to trpc.tracker.accounts.delete.mutate()
      return true;
    },
    createPurchase: async (
      _: unknown,
      _args: {
        input: {
          accountId: string;
          itemName: string;
          amount: number;
          purchaseDate: string;
        };
      },
    ) => {
      // TODO: delegate to trpc.tracker.purchases.create.mutate()
      return {
        id: "new-purchase",
        itemName: "",
        itemCategory: null,
        amount: 0,
        currency: "KRW",
        purchaseDate: new Date().toISOString(),
        storeLocation: null,
        notes: null,
        createdAt: new Date().toISOString(),
      };
    },
    updatePurchase: async (_: unknown, _args: { input: { id: string } }) => {
      // TODO: delegate to trpc.tracker.purchases.update.mutate()
      return {
        id: _args.input.id,
        itemName: "",
        itemCategory: null,
        amount: 0,
        currency: "KRW",
        purchaseDate: new Date().toISOString(),
        storeLocation: null,
        notes: null,
        createdAt: new Date().toISOString(),
      };
    },
    deletePurchase: async (_: unknown, _args: { id: string }) => {
      // TODO: delegate to trpc.tracker.purchases.delete.mutate()
      return true;
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
