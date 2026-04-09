import { router, protectedProcedure } from "./trpc.js";
import { trackerDashboardHomeControllers } from "../tracker/flows/dashboard/containers/home/controllers/index.js";
import { trackerDashboardHomeViews } from "../tracker/flows/dashboard/containers/home/views/index.js";
import { trackerAccountsListControllers } from "../tracker/flows/accounts/containers/list/controllers/index.js";
import { trackerAccountsListViews } from "../tracker/flows/accounts/containers/list/views/index.js";
import { trackerAccountsDetailControllers } from "../tracker/flows/accounts/containers/detail/controllers/index.js";
import { trackerAccountsDetailViews } from "../tracker/flows/accounts/containers/detail/views/index.js";
import { trackerHistoryBrowseControllers } from "../tracker/flows/history/containers/browse/controllers/index.js";
import { trackerHistoryBrowseViews } from "../tracker/flows/history/containers/browse/views/index.js";
import { trackerPurchasesManageControllers } from "../tracker/flows/purchases/containers/manage/controllers/index.js";
import { trackerPurchasesManageViews } from "../tracker/flows/purchases/containers/manage/views/index.js";

const dashboardRouter = router({
  home: router({
    summary: protectedProcedure
      .output(trackerDashboardHomeViews.summary.output)
      .query(async ({ ctx }) => {
        const ctrl = trackerDashboardHomeControllers(ctx.prisma);
        return ctrl.summary(ctx.userId);
      }),
  }),
});

const accountsRouter = router({
  list: router({
    all: protectedProcedure
      .input(trackerAccountsListViews.all.input)
      .output(trackerAccountsListViews.all.output)
      .query(async ({ ctx, input }) => {
        const ctrl = trackerAccountsListControllers(ctx.prisma);
        return ctrl.all(input, ctx.userId);
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
    byId: protectedProcedure
      .input(trackerAccountsDetailViews.byId.input)
      .output(trackerAccountsDetailViews.byId.output)
      .query(async ({ ctx, input }) => {
        const ctrl = trackerAccountsDetailControllers(ctx.prisma);
        return ctrl.byId(input, ctx.userId);
      }),
    update: protectedProcedure
      .input(trackerAccountsDetailViews.update.input)
      .output(trackerAccountsDetailViews.update.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerAccountsDetailControllers(ctx.prisma);
        return ctrl.update(input, ctx.userId);
      }),
    delete: protectedProcedure
      .input(trackerAccountsDetailViews.delete.input)
      .output(trackerAccountsDetailViews.delete.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerAccountsDetailControllers(ctx.prisma);
        return ctrl.delete(input, ctx.userId);
      }),
  }),
});

const historyRouter = router({
  browse: router({
    list: protectedProcedure
      .input(trackerHistoryBrowseViews.list.input)
      .output(trackerHistoryBrowseViews.list.output)
      .query(async ({ ctx, input }) => {
        const ctrl = trackerHistoryBrowseControllers(ctx.prisma);
        return ctrl.list(input, ctx.userId);
      }),
  }),
});

const purchasesRouter = router({
  manage: router({
    byId: protectedProcedure
      .input(trackerPurchasesManageViews.byId.input)
      .output(trackerPurchasesManageViews.byId.output)
      .query(async ({ ctx, input }) => {
        const ctrl = trackerPurchasesManageControllers(ctx.prisma);
        return ctrl.byId(input, ctx.userId);
      }),
    create: protectedProcedure
      .input(trackerPurchasesManageViews.create.input)
      .output(trackerPurchasesManageViews.create.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerPurchasesManageControllers(ctx.prisma);
        return ctrl.create(input, ctx.userId);
      }),
    update: protectedProcedure
      .input(trackerPurchasesManageViews.update.input)
      .output(trackerPurchasesManageViews.update.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerPurchasesManageControllers(ctx.prisma);
        return ctrl.update(input, ctx.userId);
      }),
    delete: protectedProcedure
      .input(trackerPurchasesManageViews.delete.input)
      .output(trackerPurchasesManageViews.delete.output)
      .mutation(async ({ ctx, input }) => {
        const ctrl = trackerPurchasesManageControllers(ctx.prisma);
        return ctrl.delete(input, ctx.userId);
      }),
  }),
});

export const trackerRouter = router({
  dashboard: dashboardRouter,
  accounts: accountsRouter,
  history: historyRouter,
  purchases: purchasesRouter,
});
