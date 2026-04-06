import { jest, describe, it, expect } from "@jest/globals";
import { trackerPurchasesManageControllers } from "../controllers/trackerPurchasesManage.controllers.js";

const now = new Date("2025-01-01T00:00:00Z");
const TEST_USER_ID = "00000000-0000-0000-0000-000000000000";
const OTHER_USER_ID = "11111111-1111-1111-1111-111111111111";
const ACCOUNT_ID = "acc-001";
const PURCHASE_ID = "pur-001";

const mockDbAccount = {
  id: ACCOUNT_ID,
  auth_user_id: TEST_USER_ID,
  store_name: "Test Store",
  sa_name: "Test SA",
  notes: null,
  created_at: now,
  updated_at: now,
};

const mockDbPurchase = {
  id: PURCHASE_ID,
  tracker_account_id: ACCOUNT_ID,
  item_name: "Ring",
  item_category: "Jewelry",
  amount: { toString: () => "1000.00" },
  currency: "KRW",
  purchase_date: now,
  store_location: "Seoul",
  notes: "test note",
  created_at: now,
  updated_at: now,
};

const mockDbPurchaseWithAccount = {
  ...mockDbPurchase,
  tracker_account: mockDbAccount,
};

const makePrisma = () =>
  ({
    tracker_accounts: {
      findUnique: (jest.fn() as any).mockResolvedValue(mockDbAccount),
    },
    tracker_purchases: {
      findUnique: (jest.fn() as any).mockResolvedValue(
        mockDbPurchaseWithAccount,
      ),
      create: (jest.fn() as any).mockImplementation(
        ({ data }: { data: any }) =>
          Promise.resolve({
            id: "new-pur-id",
            tracker_account_id: data.tracker_account_id,
            item_name: data.item_name,
            item_category: data.item_category ?? null,
            amount: { toString: () => data.amount.toString() },
            currency: data.currency ?? "KRW",
            purchase_date: data.purchase_date,
            store_location: data.store_location ?? null,
            notes: data.notes ?? null,
            created_at: now,
            updated_at: now,
          }),
      ),
      update: (jest.fn() as any).mockImplementation(
        ({ where, data }: { where: any; data: any }) =>
          Promise.resolve({
            ...mockDbPurchase,
            id: where.id,
            ...data,
            amount: data.amount
              ? { toString: () => data.amount.toString() }
              : mockDbPurchase.amount,
          }),
      ),
      delete: (jest.fn() as any).mockResolvedValue(mockDbPurchase),
    },
  }) as any;

describe("trackerPurchasesManageControllers", () => {
  describe("create()", () => {
    it("creates a purchase with required fields", async () => {
      const prisma = makePrisma();
      const ctrl = trackerPurchasesManageControllers(prisma);

      const result = await ctrl.create(
        {
          accountId: ACCOUNT_ID,
          itemName: "Ring",
          amount: 1000,
          purchaseDate: "2025-01-01",
        },
        TEST_USER_ID,
      );

      expect(prisma.tracker_accounts.findUnique).toHaveBeenCalledWith({
        where: { id: ACCOUNT_ID },
      });
      expect(prisma.tracker_purchases.create).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: "new-pur-id",
        itemName: "Ring",
        amount: "1000",
      });
    });

    it("creates a purchase with all optional fields", async () => {
      const prisma = makePrisma();
      const ctrl = trackerPurchasesManageControllers(prisma);

      const result = await ctrl.create(
        {
          accountId: ACCOUNT_ID,
          itemName: "Bracelet",
          amount: 2500,
          purchaseDate: "2025-06-15",
          itemCategory: "Jewelry",
          currency: "USD",
          storeLocation: "New York",
          notes: "gift",
        },
        TEST_USER_ID,
      );

      expect(result).toMatchObject({
        itemName: "Bracelet",
        amount: "2500",
        currency: "USD",
        storeLocation: "New York",
        notes: "gift",
      });
    });

    it("throws NOT_FOUND when account does not exist", async () => {
      const prisma = makePrisma();
      (prisma.tracker_accounts.findUnique as any).mockResolvedValue(null);
      const ctrl = trackerPurchasesManageControllers(prisma);

      await expect(
        ctrl.create(
          {
            accountId: "nonexistent",
            itemName: "Ring",
            amount: 1000,
            purchaseDate: "2025-01-01",
          },
          TEST_USER_ID,
        ),
      ).rejects.toMatchObject({ code: "NOT_FOUND" });
    });

    it("throws FORBIDDEN when user does not own account", async () => {
      const prisma = makePrisma();
      const ctrl = trackerPurchasesManageControllers(prisma);

      await expect(
        ctrl.create(
          {
            accountId: ACCOUNT_ID,
            itemName: "Ring",
            amount: 1000,
            purchaseDate: "2025-01-01",
          },
          OTHER_USER_ID,
        ),
      ).rejects.toMatchObject({ code: "FORBIDDEN" });
    });
  });

  describe("update()", () => {
    it("updates a purchase", async () => {
      const prisma = makePrisma();
      const ctrl = trackerPurchasesManageControllers(prisma);

      const result = await ctrl.update(
        { id: PURCHASE_ID, itemName: "Updated Ring" },
        TEST_USER_ID,
      );

      expect(prisma.tracker_purchases.findUnique).toHaveBeenCalledWith({
        where: { id: PURCHASE_ID },
        include: { tracker_account: true },
      });
      expect(prisma.tracker_purchases.update).toHaveBeenCalled();
      expect(result.id).toBe(PURCHASE_ID);
    });

    it("throws NOT_FOUND when purchase does not exist", async () => {
      const prisma = makePrisma();
      (prisma.tracker_purchases.findUnique as any).mockResolvedValue(null);
      const ctrl = trackerPurchasesManageControllers(prisma);

      await expect(
        ctrl.update({ id: "nonexistent" }, TEST_USER_ID),
      ).rejects.toMatchObject({ code: "NOT_FOUND" });
    });

    it("throws FORBIDDEN when user does not own purchase", async () => {
      const prisma = makePrisma();
      const ctrl = trackerPurchasesManageControllers(prisma);

      await expect(
        ctrl.update({ id: PURCHASE_ID }, OTHER_USER_ID),
      ).rejects.toMatchObject({ code: "FORBIDDEN" });
    });
  });

  describe("delete()", () => {
    it("deletes a purchase and returns success", async () => {
      const prisma = makePrisma();
      const ctrl = trackerPurchasesManageControllers(prisma);

      const result = await ctrl.delete({ id: PURCHASE_ID }, TEST_USER_ID);

      expect(prisma.tracker_purchases.delete).toHaveBeenCalledWith({
        where: { id: PURCHASE_ID },
      });
      expect(result).toEqual({ success: true });
    });

    it("throws NOT_FOUND when purchase does not exist", async () => {
      const prisma = makePrisma();
      (prisma.tracker_purchases.findUnique as any).mockResolvedValue(null);
      const ctrl = trackerPurchasesManageControllers(prisma);

      await expect(
        ctrl.delete({ id: "nonexistent" }, TEST_USER_ID),
      ).rejects.toMatchObject({ code: "NOT_FOUND" });
    });

    it("throws FORBIDDEN when user does not own purchase", async () => {
      const prisma = makePrisma();
      const ctrl = trackerPurchasesManageControllers(prisma);

      await expect(
        ctrl.delete({ id: PURCHASE_ID }, OTHER_USER_ID),
      ).rejects.toMatchObject({ code: "FORBIDDEN" });
    });
  });
});
