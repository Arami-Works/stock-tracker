import type { ApolloServerPlugin } from "@apollo/server";

export const loggingPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async didEncounterErrors({ errors }) {
        for (const error of errors) {
          console.error("[GraphQL Error]", error.message);
        }
      },
    };
  },
};
