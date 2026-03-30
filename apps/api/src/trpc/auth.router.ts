import { router, publicProcedure } from "./trpc.js";

export const authRouter = router({
  me: publicProcedure.query(async () => {
    // TODO: delegate to auth.controllers
    return null;
  }),
});
