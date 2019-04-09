module.exports = {
  Category: {
    movements: (parent, args, context, info) => parent.getMovements(),
  },
  Movement: {
    category: (parent, args, context, info) => parent.getCategory(),
  },
  Query: {
    movements: (parent, args, { db }, info) => db.movement.findAll(),
    categories: (parent, args, { db }, info) => db.category.findAll(),
    movement: (parent, { id }, { db }, info) => db.movement.findByPk(id),
    category: (parent, { id }, { db }, info) => db.category.findByPk(id) 
  },
  Mutation: {
    createMovement: (parent, { description, amount, categoryId }, { db }, info) =>
      db.movement.create({
        description: description,
        amount: amount,
        categoryId: categoryId
      }),
    updateMovement: (parent, { description, amount, id }, { db }, info) =>
      db.movement.update({
        description: description,
        amount: amount
      },
      {
        where: {
          id: id
        }
      }),
    deleteMovement: (parent, {id}, { db }, info) =>
      db.movement.destroy({
        where: {
          id: id
        }
      })
  }
};