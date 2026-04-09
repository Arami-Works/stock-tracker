import { randomUUID } from "node:crypto";
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import superjson from "superjson";
import { prisma } from "@stock-tracker/prisma/client";
import { createLogger } from "@stock-tracker/config";

export const logger = createLogger({
  service: "api",
  env: process.env["NODE_ENV"],
});

export const createContext = async ({ req }: CreateHTTPContextOptions) => {
  const userId = req.headers["x-user-id"] as string | undefined;
  const userRole = req.headers["x-user-role"] as string | undefined;
  const requestId =
    (req.headers["x-request-id"] as string | undefined) || randomUUID();
  return { prisma, userId, userRole, requestId };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, ctx }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        requestId: ctx?.requestId ?? randomUUID(),
      },
    };
  },
});

const logRequest = t.middleware(async ({ ctx, path, type, next }) => {
  const start = performance.now();
  const reqLogger = logger.child({ requestId: ctx.requestId, procedure: path });

  reqLogger.info({ type }, "request started");

  const result = await next();

  const duration = Math.round(performance.now() - start);

  if (result.ok) {
    reqLogger.info({ type, duration, userId: ctx.userId }, "request completed");
  } else {
    reqLogger.error(
      { type, duration, userId: ctx.userId, code: result.error.code },
      "request failed",
    );
  }

  return result;
});

const enforceAuth = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

const baseProcedure = t.procedure.use(logRequest);

export const router = t.router;
export const publicProcedure = baseProcedure;
export const protectedProcedure = baseProcedure.use(enforceAuth);
export const middleware = t.middleware;
