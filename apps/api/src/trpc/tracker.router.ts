import { router, publicProcedure, protectedProcedure } from "./trpc.js";
import { trackerDashboardHomeControllers } from "../tracker/flows/dashboard/containers/home/controllers/index.js";
import { trackerDashboardHomeViews } from "../tracker/flows/dashboard/containers/home/views/index.js";
import { trackerAccountsListControllers } from "../tracker/flows/accounts/containers/list/controllers/index.js";
import { trackerAccountsListViews } from "../tracker/flows/accounts/containers/list/views/index.js";
import { trackerAccountsDetailControllers } from "../tracker/flows/accounts/containers/detail/controllers/index.js";
import { trackerAccountsDetailViews } from "../tracker/flows/accounts/containers/detail/views/index.js";
import { trackerHistoryBrowseControllers } from "../tracker/flows/history/containers/browse/controllers/index.js";
import { trackerHistoryBrowseViews } from "../tracker/flows/history/containers/browse/views/index.js";

const dashboardRouter = router({
  home: router({
    summary: publicProcedure
      .output(trackerDashboardHomeViews.summary.output)
      .query(async ({ ctx }) => {
        const ctrl = trackerDashboardHomeControllers(ctx.prisma);
        return ctrl.summary();
      }),
  }),
});

const accountsRouter = router({
  list: router({
    all: publicProcedure
      .output(trackerAccountsListViews.all.output)
      .query(async ({ ctx }) => {
        const ctrl = trackerAccountsListControllers(ctx.prisma);
        return ctrl.all();
      }),
    create: protectedProcedure
      .input(trackerAccountsListViews.create.input)
      .output(trackerAccountsListViews.create.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerAccountsListControllers(ctx.prisma);
        return ctrl.create(input, ctx.userId);
      }),
  }),
  detail: router({
    byId: publicProcedure
      .input(trackerAccountsDetailViews.byId.input)
      .output(trackerAccountsDetailViews.byId.output)
      .query(async ({ ctx, input }) => {
        const ctrl = trackerAccountsDetailControllers(ctx.prisma);
        return ctrl.byId(input);
      }),
    update: protectedProcedure
      .input(trackerAccountsDetailViews.update.input)
      .output(trackerAccountsDetailViews.update.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerAccountsDetailControllers(ctx.prisma);
        return ctrl.update(input);
      }),
    delete: protectedProcedure
      .input(trackerAccountsDetailViews.delete.input)
      .output(trackerAccountsDetailViews.delete.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerAccountsDetailControllers(ctx.prisma);
        return ctrl.delete(input);
      }),
  }),
});

const historyRouter = router({
  browse: router({
    list: publicProcedure
      .input(trackerHistoryBrowseViews.list.input)
      .output(trackerHistoryBrowseViews.list.output)
      .query(async ({ ctx, input }) => {
        const ctrl = trackerHistoryBrowseControllers(ctx.prisma);
        return ctrl.list(input);
      }),
  }),
});

export const trackerRouter = router({
  dashboard: dashboardRouter,
  accounts: accountsRouter,
  history: historyRouter,
});
