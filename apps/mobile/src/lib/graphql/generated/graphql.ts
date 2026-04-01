/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Account = {
  __typename?: "Account";
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  notes?: Maybe<Scalars["String"]["output"]>;
  purchases: Array<Purchase>;
  saName?: Maybe<Scalars["String"]["output"]>;
  storeName: Scalars["String"]["output"];
};

export type DashboardSummary = {
  __typename?: "DashboardSummary";
  totalAccounts: Scalars["Int"]["output"];
  totalPurchases: Scalars["Int"]["output"];
  totalSpent: Scalars["Float"]["output"];
};

export type Purchase = {
  __typename?: "Purchase";
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["String"]["output"];
  currency: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  itemCategory?: Maybe<Scalars["String"]["output"]>;
  itemName: Scalars["String"]["output"];
  notes?: Maybe<Scalars["String"]["output"]>;
  purchaseDate: Scalars["String"]["output"];
  storeLocation?: Maybe<Scalars["String"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  /** Get a single account by ID */
  account?: Maybe<Account>;
  /** List all accounts for the current user */
  accounts: Array<Account>;
  /** Dashboard overview for the current user */
  dashboard: DashboardSummary;
  /** Current authenticated user */
  me?: Maybe<User>;
  /** Purchase history with optional filtering */
  purchases: Array<Purchase>;
};

export type QueryAccountArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPurchasesArgs = {
  accountId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"]["output"];
  displayName?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type DashboardQueryVariables = Exact<{ [key: string]: never }>;

export type DashboardQuery = {
  __typename?: "Query";
  dashboard: {
    __typename?: "DashboardSummary";
    totalAccounts: number;
    totalPurchases: number;
    totalSpent: number;
  };
  accounts: Array<{
    __typename?: "Account";
    id: string;
    storeName: string;
    saName?: string | null;
    purchases: Array<{ __typename?: "Purchase"; id: string; amount: number }>;
  }>;
};

export type AccountsQueryVariables = Exact<{ [key: string]: never }>;

export type AccountsQuery = {
  __typename?: "Query";
  accounts: Array<{
    __typename?: "Account";
    id: string;
    storeName: string;
    saName?: string | null;
    notes?: string | null;
    createdAt: string;
    purchases: Array<{
      __typename?: "Purchase";
      id: string;
      itemName: string;
      amount: number;
      purchaseDate: string;
    }>;
  }>;
};

export type AccountQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type AccountQuery = {
  __typename?: "Query";
  account?: {
    __typename?: "Account";
    id: string;
    storeName: string;
    saName?: string | null;
    notes?: string | null;
    createdAt: string;
    purchases: Array<{
      __typename?: "Purchase";
      id: string;
      itemName: string;
      itemCategory?: string | null;
      amount: number;
      currency: string;
      purchaseDate: string;
      storeLocation?: string | null;
      notes?: string | null;
      createdAt: string;
    }>;
  } | null;
};

export type PurchasesQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type PurchasesQuery = {
  __typename?: "Query";
  purchases: Array<{
    __typename?: "Purchase";
    id: string;
    itemName: string;
    itemCategory?: string | null;
    amount: number;
    currency: string;
    purchaseDate: string;
    storeLocation?: string | null;
    notes?: string | null;
    createdAt: string;
  }>;
};

export const DashboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Dashboard" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dashboard" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalAccounts" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalPurchases" },
                },
                { kind: "Field", name: { kind: "Name", value: "totalSpent" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "accounts" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "storeName" } },
                { kind: "Field", name: { kind: "Name", value: "saName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "purchases" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DashboardQuery, DashboardQueryVariables>;
export const AccountsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Accounts" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "accounts" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "storeName" } },
                { kind: "Field", name: { kind: "Name", value: "saName" } },
                { kind: "Field", name: { kind: "Name", value: "notes" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "purchases" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "itemName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "purchaseDate" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountsQuery, AccountsQueryVariables>;
export const AccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Account" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "account" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "storeName" } },
                { kind: "Field", name: { kind: "Name", value: "saName" } },
                { kind: "Field", name: { kind: "Name", value: "notes" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "purchases" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "itemName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "itemCategory" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currency" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "purchaseDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "storeLocation" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "notes" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountQuery, AccountQueryVariables>;
export const PurchasesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Purchases" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "accountId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "purchases" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "accountId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "accountId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "itemName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "itemCategory" },
                },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "currency" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "purchaseDate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "storeLocation" },
                },
                { kind: "Field", name: { kind: "Name", value: "notes" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PurchasesQuery, PurchasesQueryVariables>;
