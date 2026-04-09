import type { PrismaClient } from "@stock-tracker/prisma";

export const trackerAccountsListModels = (prisma: PrismaClient) => ({
  findAll: async (params: {
    userId: string;
    sortBy: "store_name" | "created_at";
    sortOrder: "asc" | "desc";
    search?: string;
  }) => {
    const where: Record<string, unknown> = {
      auth_user_id: params.userId,
    };
    if (params.search) {
      where.store_name = { contains: params.search, mode: "insensitive" };
    }

    return prisma.tracker_accounts.findMany({
      where,
      orderBy: { [params.sortBy]: params.sortOrder },
    });
  },

  create: async (data: {
    authUserId: string;
    storeName: string;
    saName?: string;
    notes?: string;
  }) => {
    return prisma.tracker_accounts.create({
      data: {
        auth_user_id: data.authUserId,
        store_name: data.storeName,
        sa_name: data.saName,
        notes: data.notes,
      },
    });
  },
});
