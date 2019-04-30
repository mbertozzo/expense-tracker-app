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
      color
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
    issue_date
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

// Category name is repeated in query to be able to
// reuse movements table component. Future refactor
// may optimize data management.
export const _getCategoryMovements = gql `
  query category (
    $id: ID!
  ) {
    category (
      id: $id
    ) {
      name
      movements {
        id
        description
        amount
        category {
          id
          name
          color
        }
      }
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