import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { appRouter } from "../trpc/router.js";

const prisma = new PrismaClient();
const caller = appRouter.createCaller({ prisma });

const TEST_USER_ID = "00000000-0000-0000-0000-000000000000";

beforeAll(async () => {
  await prisma.auth_users.upsert({
    where: { id: TEST_USER_ID },
    update: {},
    create: {
      id: TEST_USER_ID,
      supabase_id: TEST_USER_ID,
      email: "e2e@test.local",
    },
  });
});

afterAll(async () => {
  await prisma.tracker_purchases.deleteMany({});
  await prisma.tracker_accounts.deleteMany({});
  await prisma.auth_users.deleteMany({ where: { id: TEST_USER_ID } });
  await prisma.$disconnect();
});

describe("tRPC API E2E", () => {
  let accountId: string;

  it("creates an account", async () => {
    const result = await caller.tracker.accounts.list.create({
      storeName: "E2E Test Store",
      saName: "Test SA",
    });

    expect(result.id).toBeDefined();
    expect(result.storeName).toBe("E2E Test Store");
    expect(result.saName).toBe("Test SA");
    accountId = result.id;
  });

  it("lists accounts", async () => {
    const accounts = await caller.tracker.accounts.list.all();
    expect(accounts.length).toBeGreaterThanOrEqual(1);
    expect(accounts.some((a) => a.id === accountId)).toBe(true);
  });

  it("gets dashboard summary", async () => {
    const summary = await caller.tracker.dashboard.home.summary();
    expect(summary.totalAccounts).toBeGreaterThanOrEqual(1);
    expect(summary.totalSpent).toBeDefined();
  });

  it("gets account by id", async () => {
    const account = await caller.tracker.accounts.detail.byId({
      id: accountId,
    });
    expect(account.id).toBe(accountId);
    expect(account.storeName).toBe("E2E Test Store");
  });

  it("updates an account", async () => {
    const updated = await caller.tracker.accounts.detail.update({
      id: accountId,
      storeName: "Updated Store",
      notes: "updated via e2e",
    });
    expect(updated.storeName).toBe("Updated Store");
    expect(updated.notes).toBe("updated via e2e");
  });

  it("deletes an account", async () => {
    const deleted = await caller.tracker.accounts.detail.delete({
      id: accountId,
    });
    expect(deleted.success).toBe(true);

    const accounts = await caller.tracker.accounts.list.all();
    expect(accounts.some((a) => a.id === accountId)).toBe(false);
  });
});
