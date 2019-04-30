module.exports = `
  type Category {
    id: ID!
    name: String!
    color: String!
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
    balance: Float!
    expenses: Float!
    revenues: Float!
  }
  type Mutation {
    createMovement(description: String, amount:Float!, categoryId: ID!): Movement!
    updateMovement(id: ID!, description: String, amount:Float!, categoryId: ID!): Movement!
    deleteMovement(id: ID!): Int!
    createCategory(name: String!,  color: String!): Category!
  }
`;