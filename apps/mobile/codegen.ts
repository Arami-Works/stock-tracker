import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../subgraphs/tracker/src/**/views/*.ts",
  documents: ["src/lib/graphql/**/*.ts", "src/experiences/**/*.graphql"],
  generates: {
    "./src/lib/graphql/generated/": {
      preset: "client",
    },
  },
};

export default config;
