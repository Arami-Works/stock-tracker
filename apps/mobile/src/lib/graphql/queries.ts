import { gql } from "@apollo/client";

export const DASHBOARD_QUERY = gql`
  query Dashboard {
    dashboard {
      totalAccounts
      totalPurchases
      totalSpent
    }
    accounts {
      id
      storeName
      saName
      purchases {
        id
        amount
      }
    }
  }
`;

export const ACCOUNTS_QUERY = gql`
  query Accounts {
    accounts {
      id
      storeName
      saName
      notes
      createdAt
      purchases {
        id
        itemName
        amount
        purchaseDate
      }
    }
  }
`;

export const ACCOUNT_QUERY = gql`
  query Account($id: ID!) {
    account(id: $id) {
      id
      storeName
      saName
      notes
      createdAt
      purchases {
        id
        itemName
        itemCategory
        amount
        currency
        purchaseDate
        storeLocation
        notes
        createdAt
      }
    }
  }
`;

export const PURCHASES_QUERY = gql`
  query Purchases($accountId: ID) {
    purchases(accountId: $accountId) {
      id
      itemName
      itemCategory
      amount
      currency
      purchaseDate
      storeLocation
      notes
      createdAt
    }
  }
`;
