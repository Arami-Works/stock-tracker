import type { PrismaClient } from "@stock-tracker/prisma";

export const authModels = (prisma: PrismaClient) => ({
  findById: async (id: string) => {
    return prisma.auth_users.findUnique({ where: { id } });
  },

  findBySupabaseId: async (supabaseId: string) => {
    return prisma.auth_users.findUnique({
      where: { supabase_id: supabaseId },
    });
  },

  upsert: async (data: {
    supabaseId: string;
    email: string;
    displayName?: string | null;
  }) => {
    return prisma.auth_users.upsert({
      where: { supabase_id: data.supabaseId },
      create: {
        supabase_id: data.supabaseId,
        email: data.email,
        display_name: data.displayName ?? null,
      },
      update: {
        email: data.email,
        display_name: data.displayName ?? null,
      },
    });
  },
});
