export const trackerResolvers = {
  Query: {
    dashboard: async () => {
      // TODO: delegate to trpc.tracker.dashboard.home.summary.query()
      return { totalAccounts: 0, totalPurchases: 0, totalSpent: 0 };
    },
    accounts: async () => {
      // TODO: delegate to trpc.tracker.accounts.list.all.query()
      return [];
    },
    account: async (_: unknown, _args: { id: string }) => {
      // TODO: delegate to trpc.tracker.accounts.detail.byId.query()
      return null;
    },
    purchases: async (_: unknown, _args: { accountId?: string }) => {
      // TODO: delegate to trpc.tracker.history.browse.list.query()
      return [];
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
    __resolveReference: async (_ref: { id: string }) => {
      return null;
    },
    purchases: async (_parent: { id: string }) => {
      return [];
    },
  },
  Purchase: {
    __resolveReference: async (_ref: { id: string }) => {
      return null;
    },
  },
};
