import gql from 'graphql-tag';

export const _getMovements = gql `
query {
  movements {
    description
    amount
    category {
      name
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