import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@stock-tracker/api/trpc";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env["TRPC_SERVICE_URL"] || "http://localhost:4000",
      transformer: superjson,
    }),
  ],
});
