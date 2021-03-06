const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getBalance = require('./balance');
const getExpenses = require('./expenses');
const getRevenues = require('./revenues');
const getPerformance = require('./performance');

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
    balance: (parent, args, { db }, info) => getBalance(db),
    expenses: (parent, args, { db }, info) => getExpenses(db),
    revenues: (parent, args, { db }, info) => getRevenues(db),
    performance: (parent, args, { db }, info) => getPerformance(db),
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