const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (db) => {
  const totalExpenses = db.movement.sum('amount', { where: { amount: { [Op.lt]: 0 } } });

  const currentMonthExpenses = db.movement.sum('amount',
    { where:
      {
        [Op.and]: {
          amount: { [Op.lt]: 0 },
          issue_date: { [Op.gt]: moment().subtract(1, 'month').endOf('day') }
        }
      }
    }
  );

  const previousMonthExpenses = db.movement.sum('amount',
    { where:
      {
        [Op.and]: {
          amount: { [Op.lt]: 0 },
          issue_date: { [Op.lte]: moment().subtract(1, 'month').endOf('day') }
        }
      }
    }
  );

  return Promise
    .all([totalExpenses, currentMonthExpenses, previousMonthExpenses])
    .then(responses => {
      let trend = 0;
      if (responses[2] !== 0) {
        const percentage = (responses[1]*100)/responses[2];
        trend = (percentage - 100).toFixed(2);
      }

      return {
        value: responses[0],
        trend
      }
    });
}