import type { ApolloServerPlugin } from "@apollo/server";

export const loggingPlugin: ApolloServerPlugin = {
  async requestDidStart({ request, contextValue }) {
    const requestId =
      (contextValue as Record<string, unknown>)["x-request-id"] ?? "unknown";
    console.info(
      `[GraphQL] requestId=${requestId} operation=${request.operationName ?? "anonymous"}`,
    );

    return {
      async didEncounterErrors({ errors }) {
        for (const error of errors) {
          console.error(
            `[GraphQL Error] requestId=${requestId}`,
            error.message,
          );
        }
      },
    };
  },
};
