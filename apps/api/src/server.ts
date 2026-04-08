import { randomUUID } from "node:crypto";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/router.js";
import { createContext } from "./trpc/trpc.js";

const PORT = Number(process.env["PORT"] ?? 4000);

const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: (req, res, next) => {
    if (req.url === "/health" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }

    if (!req.headers["x-request-id"]) {
      req.headers["x-request-id"] = randomUUID();
    }
    res.setHeader("x-request-id", req.headers["x-request-id"]);

    next();
  },
});

server.listen(PORT);
console.info(`tRPC server listening on port ${PORT}`);
