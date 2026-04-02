import type { PrismaClient } from "@stock-tracker/prisma";
import { authModels } from "../models/index.js";

const mapUser = (user: {
  id: string;
  supabase_id: string;
  email: string;
  display_name: string | null;
  created_at: Date;
  updated_at: Date;
}) => ({
  id: user.id,
  supabaseId: user.supabase_id,
  email: user.email,
  displayName: user.display_name,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

export const authControllers = (prisma: PrismaClient) => {
  const models = authModels(prisma);

  return {
    me: async (userId?: string) => {
      if (!userId) return null;

      const user = await models.findBySupabaseId(userId);
      if (!user) return null;

      return mapUser(user);
    },

    upsertFromSupabase: async (input: {
      supabaseId: string;
      email: string;
      displayName?: string | null;
    }) => {
      const user = await models.upsert(input);
      return mapUser(user);
    },
  };
};
