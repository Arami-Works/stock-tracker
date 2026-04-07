import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { appRouter } from "../trpc/router.js";

const prisma = new PrismaClient();
const TEST_USER_ID = "00000000-0000-0000-0000-000000000000";

const caller = appRouter.createCaller({ prisma, userId: TEST_USER_ID } as any);
const unauthCaller = appRouter.createCaller({
  prisma,
  userId: undefined,
} as any);

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

describe("auth E2E", () => {
  it("returns the seeded user from auth.me", async () => {
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.id).toBe(TEST_USER_ID);
    expect(result?.email).toBe("e2e@test.local");
  });
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

describe("purchases E2E", () => {
  let accountId: string;
  let purchaseId: string;

  beforeAll(async () => {
    const account = await caller.tracker.accounts.list.create({
      storeName: "Purchase Test Store",
    });
    accountId = account.id;
  });

  afterAll(async () => {
    await prisma.tracker_purchases.deleteMany({
      where: { tracker_account_id: accountId },
    });
    await prisma.tracker_accounts.deleteMany({ where: { id: accountId } });
  });

  it("creates a purchase", async () => {
    const result = await caller.tracker.purchases.manage.create({
      accountId,
      itemName: "Test Ring",
      amount: 5000000,
      purchaseDate: "2025-01-15",
      currency: "KRW",
      itemCategory: "Ring",
    });

    expect(result.id).toBeDefined();
    expect(result.itemName).toBe("Test Ring");
    expect(result.amount).toBe("5000000");
    expect(result.trackerAccountId).toBe(accountId);
    purchaseId = result.id;
  });

  it("gets a purchase by id", async () => {
    const result = await caller.tracker.purchases.manage.byId({
      id: purchaseId,
    });
    expect(result.id).toBe(purchaseId);
    expect(result.itemName).toBe("Test Ring");
  });

  it("lists purchases via history browse", async () => {
    const { items } = await caller.tracker.history.browse.list({
      accountId,
    });
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items.some((p) => p.id === purchaseId)).toBe(true);
  });

  it("updates a purchase", async () => {
    const updated = await caller.tracker.purchases.manage.update({
      id: purchaseId,
      itemName: "Updated Ring",
      amount: 6000000,
      notes: "updated via e2e",
    });
    expect(updated.itemName).toBe("Updated Ring");
    expect(updated.amount).toBe("6000000");
    expect(updated.notes).toBe("updated via e2e");
  });

  it("deletes a purchase", async () => {
    const deleted = await caller.tracker.purchases.manage.delete({
      id: purchaseId,
    });
    expect(deleted.success).toBe(true);

    const { items } = await caller.tracker.history.browse.list({
      accountId,
    });
    expect(items.some((p) => p.id === purchaseId)).toBe(false);
  });
});

describe("auth enforcement E2E", () => {
  it("throws UNAUTHORIZED for auth.me without userId", async () => {
    await expect(unauthCaller.auth.me()).rejects.toThrow(TRPCError);
    try {
      await unauthCaller.auth.me();
    } catch (e) {
      expect((e as TRPCError).code).toBe("UNAUTHORIZED");
    }
  });

  it("throws UNAUTHORIZED for tracker.accounts.list.all without userId", async () => {
    await expect(unauthCaller.tracker.accounts.list.all()).rejects.toThrow(
      TRPCError,
    );
  });

  it("throws UNAUTHORIZED for tracker.dashboard.home.summary without userId", async () => {
    await expect(
      unauthCaller.tracker.dashboard.home.summary(),
    ).rejects.toThrow(TRPCError);
  });

  it("allows public upsertFromSupabase without userId", async () => {
    const result = await unauthCaller.auth.upsertFromSupabase({
      supabaseId: "public-test-supabase-id",
      email: "public@test.local",
    });
    expect(result.email).toBe("public@test.local");

    await prisma.auth_users.deleteMany({
      where: { supabase_id: "public-test-supabase-id" },
    });
  });
});

describe("pagination E2E", () => {
  let paginationAccountId: string;
  const purchaseIds: string[] = [];

  beforeAll(async () => {
    const account = await caller.tracker.accounts.list.create({
      storeName: "Pagination Test Store",
    });
    paginationAccountId = account.id;

    for (let i = 0; i < 5; i++) {
      const purchase = await caller.tracker.purchases.manage.create({
        accountId: paginationAccountId,
        itemName: `Pagination Item ${i}`,
        amount: 1000000 * (i + 1),
        purchaseDate: `2025-01-${String(i + 1).padStart(2, "0")}`,
        currency: "KRW",
      });
      purchaseIds.push(purchase.id);
    }
  });

  afterAll(async () => {
    await prisma.tracker_purchases.deleteMany({
      where: { tracker_account_id: paginationAccountId },
    });
    await prisma.tracker_accounts.deleteMany({
      where: { id: paginationAccountId },
    });
  });

  it("returns empty items for account with no purchases", async () => {
    const emptyAccount = await caller.tracker.accounts.list.create({
      storeName: "Empty Account",
    });

    const { items, nextCursor } = await caller.tracker.history.browse.list({
      accountId: emptyAccount.id,
    });

    expect(items).toEqual([]);
    expect(nextCursor).toBeNull();

    await prisma.tracker_accounts.deleteMany({
      where: { id: emptyAccount.id },
    });
  });

  it("paginates through results with cursor", async () => {
    const page1 = await caller.tracker.history.browse.list({
      accountId: paginationAccountId,
      limit: 2,
      sortOrder: "desc",
    });

    expect(page1.items).toHaveLength(2);
    expect(page1.nextCursor).not.toBeNull();

    const page2 = await caller.tracker.history.browse.list({
      accountId: paginationAccountId,
      limit: 2,
      sortOrder: "desc",
      cursor: page1.nextCursor!,
    });

    expect(page2.items).toHaveLength(2);
    expect(page2.nextCursor).not.toBeNull();

    const page3 = await caller.tracker.history.browse.list({
      accountId: paginationAccountId,
      limit: 2,
      sortOrder: "desc",
      cursor: page2.nextCursor!,
    });

    expect(page3.items).toHaveLength(1);
    expect(page3.nextCursor).toBeNull();

    const allIds = [
      ...page1.items.map((i) => i.id),
      ...page2.items.map((i) => i.id),
      ...page3.items.map((i) => i.id),
    ];
    expect(new Set(allIds).size).toBe(5);
  });
});
