const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (db) => {
  const currentBalance = db.movement.sum('amount');

  const previousBalance = db.movement.sum('amount',
    { where:
      {
        issue_date: { [Op.lte]: moment().subtract(1, 'month').endOf('day') }
      }
    }
  );

  return Promise
    .all([currentBalance, previousBalance])
    .then(responses => {
      let trend = 0;
      if (responses[1] !== 0) {
        const percentage = (responses[0]*100)/responses[1];
        trend = (percentage - 100).toFixed(2);
      }

      return {
        value: responses[0],
        trend
      }
    });
}