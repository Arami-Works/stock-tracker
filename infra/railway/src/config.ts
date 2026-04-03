export const PROJECT_NAME = "stock-tracker";

export interface ServiceDef {
  name: string;
  image: string;
  port: number;
  healthcheckPath?: string;
}

export interface EnvironmentConfig {
  railwayEnvName: string;
  imageTag: string;
  nodeEnv: string;
}

export const ENVIRONMENTS: Record<string, EnvironmentConfig> = {
  develop: {
    railwayEnvName: "develop",
    imageTag: "develop",
    nodeEnv: "development",
  },
  stage: {
    railwayEnvName: "stage",
    imageTag: "stage",
    nodeEnv: "staging",
  },
  production: {
    railwayEnvName: "production",
    imageTag: "main",
    nodeEnv: "production",
  },
};

export const SERVICES: ServiceDef[] = [
  {
    name: "api",
    image: "ghcr.io/arami-works/stock-tracker-api",
    port: 4000,
    healthcheckPath: "/health",
  },
  // Future: uncomment when Dockerized
  // {
  //   name: "subgraph-tracker",
  //   image: "ghcr.io/arami-works/stock-tracker-subgraph-tracker",
  //   port: 4001,
  //   healthcheckPath: "/health",
  // },
];
