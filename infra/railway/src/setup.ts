import {
  createClient,
  createServiceDomain,
  getOrCreateEnvironment,
  getOrCreateProject,
  getOrCreateService,
  updateServiceInstance,
  upsertVariable,
} from "./client.js";
import {
  ENVIRONMENTS,
  PROJECT_NAME,
  SERVICES,
  type EnvironmentConfig,
  type ServiceDef,
} from "./config.js";

const token = process.env["RAILWAY_API_TOKEN"];
if (!token) {
  console.error("RAILWAY_API_TOKEN is required");
  process.exit(1);
}

const envArg = process.argv[2];
if (!envArg || !ENVIRONMENTS[envArg]) {
  console.error(
    `Usage: tsx src/setup.ts <${Object.keys(ENVIRONMENTS).join("|")}>`,
  );
  process.exit(1);
}

const envConfig: EnvironmentConfig = ENVIRONMENTS[envArg]!;
const client = createClient(token);

async function setupService(
  projectId: string,
  environmentId: string,
  service: ServiceDef,
  config: EnvironmentConfig,
): Promise<void> {
  const imageWithTag = `${service.image}:${config.imageTag}`;
  const svc = await getOrCreateService(
    client,
    projectId,
    service.name,
    imageWithTag,
  );

  // Configure service instance for this environment
  await updateServiceInstance(client, svc.id, environmentId, {
    startCommand: "npm run start",
    healthcheckPath: service.healthcheckPath,
  });
  console.log(`  Configured ${service.name} instance`);

  // Set environment variables (non-secret — secrets come from Doppler)
  const vars: Record<string, string> = {
    PORT: String(service.port),
    NODE_ENV: config.nodeEnv,
  };

  for (const [name, value] of Object.entries(vars)) {
    await upsertVariable(client, projectId, environmentId, svc.id, name, value);
  }
  console.log(`  Set variables: ${Object.keys(vars).join(", ")}`);

  // Create Railway-generated domain for public access
  try {
    const domain = await createServiceDomain(
      client,
      svc.id,
      environmentId,
      service.port,
    );
    console.log(`  Domain: https://${domain}`);
  } catch {
    console.log(`  Domain already exists (skipping)`);
  }
}

async function main(): Promise<void> {
  console.log(`\nSetting up Railway: ${envArg}`);
  console.log("─".repeat(40));

  // 1. Get or create project
  console.log("\n1. Project");
  const project = await getOrCreateProject(client, PROJECT_NAME);

  // 2. Get or create environment
  console.log("\n2. Environment");
  const env = await getOrCreateEnvironment(
    client,
    project.id,
    envConfig.railwayEnvName,
  );

  // 3. Set up each service
  for (const service of SERVICES) {
    console.log(`\n3. Service: ${service.name}`);
    await setupService(project.id, env.id, service, envConfig);
  }

  console.log("\n─".repeat(40));
  console.log(`Done. Railway "${envArg}" environment is configured.`);
  console.log(
    "\nNext steps:",
    "\n  - Ensure GHCR credentials are set in Railway for private image pulls",
    "\n  - Configure Doppler → Railway sync for DATABASE_URL and secrets",
    "\n  - Push to branch to trigger Docker build + Railway redeploy",
  );
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
