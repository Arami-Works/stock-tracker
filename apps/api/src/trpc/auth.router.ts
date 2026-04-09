import { router, protectedProcedure } from "./trpc.js";
import { authControllers } from "../auth/controllers/index.js";
import { authViews } from "../auth/views/index.js";

export const authRouter = router({
  me: protectedProcedure.output(authViews.me.output).query(async ({ ctx }) => {
    const ctrl = authControllers(ctx.prisma);
    return ctrl.me(ctx.userId);
  }),
  upsertFromSupabase: protectedProcedure
    .input(authViews.upsert.input)
    .output(authViews.upsert.output)
    .mutation(async ({ ctx, input }) => {
      const ctrl = authControllers(ctx.prisma);
      return ctrl.upsertFromSupabase({
        supabaseId: ctx.userId,
        email: input.email,
        displayName: input.displayName,
      });
    }),
});
