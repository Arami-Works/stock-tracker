import pino from "pino";

interface LoggerOptions {
  service: string;
  env?: string;
}

export const createLogger = ({ service, env }: LoggerOptions) => {
  const isDev = (env ?? process.env["NODE_ENV"]) === "development";

  return pino({
    level: isDev ? "debug" : "info",
    ...(isDev && {
      transport: {
        target: "pino-pretty",
        options: { colorize: true },
      },
    }),
    base: { service },
  });
};

export type Logger = ReturnType<typeof createLogger>;
