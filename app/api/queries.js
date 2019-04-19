import gql from 'graphql-tag';

export const _getMovements = gql `
query {
  movements {
    id
    description
    amount
    category {
      id
      name
    }
  }
}
`;

export const _getMovement = gql `
query movement (
  $id: ID!
) {
  movement (
    id: $id
  ) {
    id
    description
    amount
    category {
      id
    }
  }
}
`;

export const _getCategories = gql `
  query {
    categories {
      id
      name
    }
  }
`;

export const _getBalance = gql `
  query {
    balance
  }
`;

export const _getExpenses = gql `
  query {
    expenses
  }
`;

export const _getRevenues = gql `
  query {
    revenues
  }
`;