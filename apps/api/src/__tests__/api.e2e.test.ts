import assert from "node:assert/strict";
import { PrismaClient } from "@prisma/client";
import { appRouter } from "../trpc/router.js";

const prisma = new PrismaClient();
const caller = appRouter.createCaller({ prisma });

const TEST_USER_ID = "00000000-0000-0000-0000-000000000000";

async function setup() {
  await prisma.auth_users.upsert({
    where: { id: TEST_USER_ID },
    update: {},
    create: {
      id: TEST_USER_ID,
      supabase_id: TEST_USER_ID,
      email: "e2e@test.local",
    },
  });
}

async function teardown() {
  await prisma.tracker_purchases.deleteMany({});
  await prisma.tracker_accounts.deleteMany({});
  await prisma.auth_users.deleteMany({ where: { id: TEST_USER_ID } });
  await prisma.$disconnect();
}

async function run() {
  await setup();

  try {
    // Create account
    const created = await caller.tracker.accounts.list.create({
      storeName: "E2E Test Store",
      saName: "Test SA",
    });
    assert.ok(created.id, "account should have an id");
    assert.equal(created.storeName, "E2E Test Store");
    assert.equal(created.saName, "Test SA");
    console.log("✓ creates an account");

    // List accounts
    const accounts = await caller.tracker.accounts.list.all();
    assert.ok(accounts.length >= 1);
    assert.ok(accounts.some((a) => a.id === created.id));
    console.log("✓ lists accounts");

    // Dashboard summary
    const summary = await caller.tracker.dashboard.home.summary();
    assert.ok(summary.totalAccounts >= 1);
    assert.ok(summary.totalSpent !== undefined);
    console.log("✓ gets dashboard summary");

    // Get by ID
    const account = await caller.tracker.accounts.detail.byId({
      id: created.id,
    });
    assert.equal(account.id, created.id);
    assert.equal(account.storeName, "E2E Test Store");
    console.log("✓ gets account by id");

    // Update
    const updated = await caller.tracker.accounts.detail.update({
      id: created.id,
      storeName: "Updated Store",
      notes: "updated via e2e",
    });
    assert.equal(updated.storeName, "Updated Store");
    assert.equal(updated.notes, "updated via e2e");
    console.log("✓ updates an account");

    // Delete
    const deleted = await caller.tracker.accounts.detail.delete({
      id: created.id,
    });
    assert.equal(deleted.success, true);
    const remaining = await caller.tracker.accounts.list.all();
    assert.ok(!remaining.some((a) => a.id === created.id));
    console.log("✓ deletes an account");

    console.log("\n6/6 tests passed");
  } finally {
    await teardown();
  }
}

run().catch((err) => {
  console.error("E2E FAILED:", err);
  process.exit(1);
});
