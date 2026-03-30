import { router } from "./trpc.js";
import { authRouter } from "./auth.router.js";
import { trackerRouter } from "./tracker.router.js";

export const appRouter = router({
  auth: authRouter,
  tracker: trackerRouter,
});

export type AppRouter = typeof appRouter;
