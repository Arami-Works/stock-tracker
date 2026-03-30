import { router, publicProcedure } from "./trpc.js";
import { z } from "zod";

const dashboardRouter = router({
  home: router({
    summary: publicProcedure.query(async () => {
      // TODO: delegate to tracker-dashboard-home.controllers
      return { totalPurchases: 0, totalSpent: "0" };
    }),
  }),
});

const accountsRouter = router({
  list: router({
    all: publicProcedure.query(async () => {
      // TODO: delegate to tracker-accounts-list.controllers
      return [];
    }),
  }),
  detail: router({
    byId: publicProcedure
      .input(z.object({ id: z.string().uuid() }))
      .query(async () => {
        // TODO: delegate to tracker-accounts-detail.controllers
        return null;
      }),
  }),
});

const historyRouter = router({
  browse: router({
    list: publicProcedure.query(async () => {
      // TODO: delegate to tracker-history-browse.controllers
      return [];
    }),
  }),
});

export const trackerRouter = router({
  dashboard: dashboardRouter,
  accounts: accountsRouter,
  history: historyRouter,
});
