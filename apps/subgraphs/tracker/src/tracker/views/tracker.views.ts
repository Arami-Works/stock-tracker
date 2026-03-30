import { gql } from "graphql-tag";

export const trackerTypeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    storeName: String!
    saName: String
    notes: String
    createdAt: String!
    purchases: [Purchase!]!
  }

  type Purchase @key(fields: "id") {
    id: ID!
    itemName: String!
    itemCategory: String
    amount: Float!
    currency: String!
    purchaseDate: String!
    storeLocation: String
    notes: String
    createdAt: String!
  }

  type DashboardSummary {
    totalAccounts: Int!
    totalPurchases: Int!
    totalSpent: Float!
  }

  extend type Query {
    """
    Dashboard overview for the current user
    """
    dashboard: DashboardSummary!

    """
    List all accounts for the current user
    """
    accounts: [Account!]!

    """
    Get a single account by ID
    """
    account(id: ID!): Account

    """
    Purchase history with optional filtering
    """
    purchases(accountId: ID): [Purchase!]!
  }
`;
