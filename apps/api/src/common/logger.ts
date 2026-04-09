import { createLogger } from "@stock-tracker/config";

export const logger = createLogger({
  service: "api",
  env: process.env["NODE_ENV"],
});
