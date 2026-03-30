import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { prisma } from "@stock-tracker/prisma/client";

export const createContext = async () => {
  return { prisma };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
