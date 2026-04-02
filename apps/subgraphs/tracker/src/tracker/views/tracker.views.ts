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

  input CreateAccountInput {
    storeName: String!
    saName: String
    notes: String
  }

  input UpdateAccountInput {
    id: ID!
    storeName: String
    saName: String
    notes: String
  }

  input CreatePurchaseInput {
    accountId: ID!
    itemName: String!
    itemCategory: String
    amount: Float!
    currency: String
    purchaseDate: String!
    storeLocation: String
    notes: String
  }

  input UpdatePurchaseInput {
    id: ID!
    itemName: String
    itemCategory: String
    amount: Float
    currency: String
    purchaseDate: String
    storeLocation: String
    notes: String
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

  extend type Mutation {
    createAccount(input: CreateAccountInput!): Account!
    updateAccount(input: UpdateAccountInput!): Account!
    deleteAccount(id: ID!): Boolean!
    createPurchase(input: CreatePurchaseInput!): Purchase!
    updatePurchase(input: UpdatePurchaseInput!): Purchase!
    deletePurchase(id: ID!): Boolean!
  }
`;
