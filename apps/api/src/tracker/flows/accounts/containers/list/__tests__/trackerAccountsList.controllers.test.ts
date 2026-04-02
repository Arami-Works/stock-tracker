import { jest, describe, it, expect } from "@jest/globals";
import { trackerAccountsListControllers } from "../controllers/trackerAccountsList.controllers.js";

const now = new Date("2025-01-01T00:00:00Z");

const mockDbAccount = {
  id: "acc-001",
  auth_user_id: "00000000-0000-0000-0000-000000000000",
  store_name: "Test Store",
  sa_name: "Test SA",
  notes: "some notes",
  created_at: now,
  updated_at: now,
};

const makePrisma = () =>
  ({
    tracker_accounts: {
      findMany: jest.fn().mockResolvedValue([mockDbAccount]),
      create: jest.fn().mockImplementation(({ data }) => {
        return Promise.resolve({
          id: "new-acc-id",
          auth_user_id: data.auth_user_id,
          store_name: data.store_name,
          sa_name: data.sa_name ?? null,
          notes: data.notes ?? null,
          created_at: now,
          updated_at: now,
        });
      }),
    },
  }) as any;

describe("trackerAccountsListControllers", () => {
  describe("all()", () => {
    it("returns mapped accounts from database", async () => {
      const prisma = makePrisma();
      const ctrl = trackerAccountsListControllers(prisma);

      const result = await ctrl.all();

      expect(prisma.tracker_accounts.findMany).toHaveBeenCalledWith({
        orderBy: { created_at: "desc" },
      });
      expect(result).toEqual([
        {
          id: "acc-001",
          authUserId: mockDbAccount.auth_user_id,
          storeName: "Test Store",
          saName: "Test SA",
          notes: "some notes",
          createdAt: now,
          updatedAt: now,
        },
      ]);
    });

    it("returns empty array when no accounts exist", async () => {
      const prisma = makePrisma();
      (prisma.tracker_accounts.findMany as jest.Mock).mockResolvedValue([]);
      const ctrl = trackerAccountsListControllers(prisma);

      const result = await ctrl.all();

      expect(result).toEqual([]);
    });
  });

  describe("create()", () => {
    const TEST_USER_ID = "00000000-0000-0000-0000-000000000000";

    it("creates an account with required fields", async () => {
      const prisma = makePrisma();
      const ctrl = trackerAccountsListControllers(prisma);

      const result = await ctrl.create(
        { storeName: "New Store" },
        TEST_USER_ID,
      );

      expect(prisma.tracker_accounts.create).toHaveBeenCalledWith({
        data: {
          auth_user_id: "00000000-0000-0000-0000-000000000000",
          store_name: "New Store",
          sa_name: undefined,
          notes: undefined,
        },
      });
      expect(result).toMatchObject({
        id: "new-acc-id",
        storeName: "New Store",
      });
    });

    it("creates an account with all optional fields", async () => {
      const prisma = makePrisma();
      const ctrl = trackerAccountsListControllers(prisma);

      const result = await ctrl.create(
        {
          storeName: "Full Store",
          saName: "SA Name",
          notes: "detailed notes",
        },
        TEST_USER_ID,
      );

      expect(prisma.tracker_accounts.create).toHaveBeenCalledWith({
        data: {
          auth_user_id: "00000000-0000-0000-0000-000000000000",
          store_name: "Full Store",
          sa_name: "SA Name",
          notes: "detailed notes",
        },
      });
      expect(result).toMatchObject({
        storeName: "Full Store",
        saName: "SA Name",
        notes: "detailed notes",
      });
    });

    // NOTE: create() already accepts userId as a parameter. Once INF-553
    // lands protectedProcedure, the router will pass ctx.userId here
    // instead of the placeholder.
  });
});
