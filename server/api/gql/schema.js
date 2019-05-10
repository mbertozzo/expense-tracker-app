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
    issue_date: String
    categoryId: ID!
    category: Category!
  }
  type Movements {
    nodes: [Movement!]!
    totalCount: Int!
  }
  type Report {
    value: Float!
    trend: Float!
  }
  type Query {
    movements(limit: Int, offset: Int): Movements!
    movement(id: ID!): Movement
    category(id: ID!): Category
    categories: [Category!]!
    balance: Report!
    expenses: Report!
    revenues: Report!
    performance: Float!
  }
  type Mutation {
    createMovement(description: String, amount:Float!, issue_date: String, categoryId: ID!): Movement!
    updateMovement(id: ID!, description: String, amount:Float!, issue_date: String, categoryId: ID!): Movement!
    deleteMovement(id: ID!): Int!
    createCategory(name: String!,  color: String!): Category!
  }
`;