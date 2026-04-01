/**
 * Triggers a Railway redeploy for all services in a given environment.
 * Called from CI after Docker image push.
 *
 * Usage: RAILWAY_API_TOKEN=xxx tsx src/redeploy.ts <develop|stage|production>
 */
import { GraphQLClient, gql } from "graphql-request";
import {
  createClient,
  listEnvironments,
  listProjects,
  listServices,
} from "./client.js";
import { ENVIRONMENTS, PROJECT_NAME, SERVICES } from "./config.js";

const token = process.env["RAILWAY_API_TOKEN"];
if (!token) {
  console.error("RAILWAY_API_TOKEN is required");
  process.exit(1);
}

const envArg = process.argv[2];
if (!envArg || !ENVIRONMENTS[envArg]) {
  console.error(
    `Usage: tsx src/redeploy.ts <${Object.keys(ENVIRONMENTS).join("|")}>`,
  );
  process.exit(1);
}

const envConfig = ENVIRONMENTS[envArg]!;
const client = createClient(token);

async function getLatestDeploymentId(
  gqlClient: GraphQLClient,
  serviceId: string,
  environmentId: string,
): Promise<string | null> {
  const data = await gqlClient.request<{
    deployments: { edges: { node: { id: string } }[] };
  }>(
    gql`
      query deployments($input: DeploymentListInput!, $first: Int) {
        deployments(input: $input, first: $first) {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
    {
      input: { serviceId, environmentId },
      first: 1,
    },
  );
  return data.deployments.edges[0]?.node.id ?? null;
}

async function redeployService(
  gqlClient: GraphQLClient,
  deploymentId: string,
): Promise<void> {
  await gqlClient.request(
    gql`
      mutation deploymentRedeploy($id: String!) {
        deploymentRedeploy(id: $id) {
          id
          status
        }
      }
    `,
    { id: deploymentId },
  );
}

async function main(): Promise<void> {
  console.log(`Triggering redeploy for: ${envArg}`);

  // Resolve project
  const projects = await listProjects(client);
  const project = projects.find((p) => p.name === PROJECT_NAME);
  if (!project) throw new Error(`Project "${PROJECT_NAME}" not found`);

  // Resolve environment
  const envs = await listEnvironments(client, project.id);
  const env = envs.find((e) => e.name === envConfig.railwayEnvName);
  if (!env)
    throw new Error(`Environment "${envConfig.railwayEnvName}" not found`);

  // Resolve services and redeploy
  const services = await listServices(client, project.id);
  const serviceNames = SERVICES.map((s) => s.name);

  for (const svc of services) {
    if (!serviceNames.includes(svc.name)) continue;

    const deploymentId = await getLatestDeploymentId(client, svc.id, env.id);
    if (!deploymentId) {
      console.log(`  ${svc.name}: no deployment found, skipping`);
      continue;
    }

    await redeployService(client, deploymentId);
    console.log(`  ${svc.name}: redeployed`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Redeploy failed:", err);
  process.exit(1);
});
