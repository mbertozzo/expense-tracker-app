import gql from 'graphql-tag';

export const _addMovement = gql `
  mutation createMovement(
    $description: String!,
    $amount: Float!,
    $categoryId: ID!,
  ) {
    createMovement(
      description: $description,
      amount: $amount,
      categoryId: $categoryId,
    ) {
      description
      amount
      categoryId
    }
  }
`;

export const _addCategory = gql `
  mutation createCategory(
    $name: String!,
    $description: String!,
  ) {
    createCategory(
      name: $name,
      description: $description,
    ) {
      id
      name
    }
  }
`;