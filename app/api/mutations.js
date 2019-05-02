import gql from 'graphql-tag';

export const _addMovement = gql `
  mutation createMovement(
    $description: String!,
    $amount: Float!,
    $issue_date: String,
    $categoryId: ID!,
  ) {
    createMovement(
      description: $description,
      amount: $amount,
      issue_date: $issue_date,
      categoryId: $categoryId,
    ) {
      description
      amount
      issue_date
      categoryId
    }
  }
`;

export const _updateMovement = gql `
  mutation updateMovement(
    $id: ID!
    $description: String!,
    $amount: Float!,
    $issue_date: String,
    $categoryId: ID!,
  ) {
    updateMovement(
      id: $id
      description: $description,
      amount: $amount,
      issue_date: $issue_date,
      categoryId: $categoryId,
    ) {
      id
      description
      amount
      issue_date
      category {
        id
        name
      }
    }
  } 
`;


export const _deleteMovement = gql `
  mutation deleteMovement(
    $id: ID!
  ) {
    deleteMovement(
      id: $id
    )
  }
`;

export const _addCategory = gql `
  mutation createCategory(
    $name: String!,
    $color: String!,
  ) {
    createCategory(
      name: $name,
      color: $color,
    ) {
      id
      name
    }
  }
`;