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
