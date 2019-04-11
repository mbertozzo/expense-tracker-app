module.exports = `
  type Category {
    id: ID!
    name: String!
    description: String!
    movements: [Movement!]!
  }
  type Movement {
    id: ID!
    description: String
    amount: Float!
    categoryId: ID!
    category: Category!
  }
  type Query {
    movements: [Movement!]!
    movement(id: ID!): Movement
    category(id: ID!): Category
    categories: [Category!]!
    amount: Float!
  }
  type Mutation {
    createMovement(description: String, amount:Float!, categoryId: ID!): Movement!
    updateMovement(id: ID!, description: String, amount:Float!): [Int!]!
    deleteMovement(id: ID!): Int!
  }
`;