import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/router.js";
import { createContext } from "./trpc/trpc.js";

const PORT = Number(process.env["PORT"] ?? 4000);

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

server.listen(PORT);
console.info(`tRPC server listening on port ${PORT}`);
