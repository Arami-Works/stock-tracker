export const authResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, _context: { userId?: string }) => {
      // TODO: delegate to trpc.auth.me.query()
      return null;
    },
  },
  User: {
    __resolveReference: async (_ref: { id: string }) => {
      // TODO: delegate to trpc.auth lookup
      return null;
    },
  },
};
