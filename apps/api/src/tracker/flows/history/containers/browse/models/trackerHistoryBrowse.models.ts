import type { PrismaClient, Prisma } from "@stock-tracker/prisma";

export const trackerHistoryBrowseModels = (prisma: PrismaClient) => ({
  list: async (params: {
    userId: string;
    accountId?: string;
    cursor?: string;
    limit: number;
    sortOrder: "asc" | "desc";
    dateRange?: { from?: string; to?: string };
    amountRange?: { min?: number; max?: number };
    itemCategory?: string;
    search?: string;
  }) => {
    const trackerAccountWhere: Prisma.tracker_accountsWhereInput = {
      auth_user_id: params.userId,
    };
    if (params.search) {
      trackerAccountWhere.store_name = {
        contains: params.search,
        mode: "insensitive",
      };
    }

    const where: Prisma.tracker_purchasesWhereInput = {
      tracker_account: trackerAccountWhere,
    };

    if (params.accountId) {
      where.tracker_account_id = params.accountId;
    }
    if (params.dateRange?.from || params.dateRange?.to) {
      where.purchase_date = {
        ...(params.dateRange.from && { gte: params.dateRange.from }),
        ...(params.dateRange.to && { lte: params.dateRange.to }),
      };
    }
    if (params.amountRange?.min !== undefined || params.amountRange?.max !== undefined) {
      where.amount = {
        ...(params.amountRange?.min !== undefined && { gte: params.amountRange.min }),
        ...(params.amountRange?.max !== undefined && { lte: params.amountRange.max }),
      };
    }
    if (params.itemCategory) {
      where.item_category = params.itemCategory;
    }

    return prisma.tracker_purchases.findMany({
      where,
      include: {
        tracker_account: {
          select: { id: true, store_name: true },
        },
      },
      orderBy: { purchase_date: params.sortOrder },
      take: params.limit + 1,
      ...(params.cursor && {
        cursor: { id: params.cursor },
        skip: 1,
      }),
    });
  },
});
