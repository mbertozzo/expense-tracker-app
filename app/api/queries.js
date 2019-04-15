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