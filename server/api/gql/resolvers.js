const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  Category: {
    movements: (parent, args, context, info) => parent.getMovements(),
  },
  Movement: {
    category: (parent, args, context, info) => parent.getCategory(),
  },
  Query: {
    movements: (parent, args, { db }, info) => db.movement.findAll({ order: [ ['id', 'DESC'] ] }),
    categories: (parent, args, { db }, info) => db.category.findAll(),
    movement: (parent, { id }, { db }, info) => db.movement.findByPk(id),
    category: (parent, { id }, { db }, info) => db.category.findByPk(id),
    balance: (parent, args, { db }, info) => db.movement.sum('amount'),
    expenses: (parent, args, { db }, info) => db.movement.sum('amount', { where: { amount: { [Op.lt]: 0 } } }),
    revenues: (parent, args, { db }, info) => db.movement.sum('amount', { where: { amount: { [Op.gt]: 0 } } }),
    performance: (parent, args, { db }, info) => {
      const monthlyExpenses = db.movement.sum('amount',
        { where:
          {
            [Op.and]: {
              amount: { [Op.lt]: 0 },
              issue_date: {
                [Op.and]: 
                  { 
                    [Op.lte]: moment().endOf('day'),
                    [Op.gte]: moment().subtract(1, 'month').startOf('day')
                  }
              }
            }
          }
        }
      );
      const monthlyRevenues = db.movement.sum('amount',
        { where:
          {
            [Op.and]: {
              amount: { [Op.gt]: 0 },
              issue_date: {
                [Op.and]: 
                  { 
                    [Op.lte]: moment().endOf('day'),
                    [Op.gte]: moment().subtract(1, 'month').startOf('day')
                  }
              }
            }
          }
        }
      );

      return Promise
        .all([monthlyExpenses, monthlyRevenues])
        .then(responses => {
          const percentage = (responses[0]*100)/responses[1];
          return Math.abs(percentage.toFixed(2));
        });
    },
  },
  Mutation: {
    createMovement: (parent, { description, amount, issue_date, categoryId }, { db }, info) =>
      db.movement.create({
        description: description,
        amount: amount,
        issue_date: issue_date,
        categoryId: categoryId
      }),
    updateMovement: (parent, { description, amount, issue_date, categoryId, id }, { db }, info) =>
      db.movement.update({
        description: description,
        amount: amount,
        issue_date: issue_date,
        categoryId: categoryId
      },
      {
        where: {
          id: id
        }
      }).then(() => db.movement.findByPk(id)),
    deleteMovement: (parent, {id}, { db }, info) =>
      db.movement.destroy({
        where: {
          id: id
        }
      }),
    createCategory: (parent, { name, color }, { db }, info) =>
      db.category.create({
        name: name,
        color: color,
      }),
  }
};