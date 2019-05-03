const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (db) => {
  const totalRevenues = db.movement.sum('amount', { where: { amount: { [Op.gt]: 0 } } });

  const currentMonthRevenues = db.movement.sum('amount',
    { where:
      {
        [Op.and]: {
          amount: { [Op.gt]: 0 },
          issue_date: { [Op.gt]: moment().subtract(1, 'month').endOf('day') }
        }
      }
    }
  );

  const previousMonthRevenues = db.movement.sum('amount',
    { where:
      {
        [Op.and]: {
          amount: { [Op.gt]: 0 },
          issue_date: { [Op.lte]: moment().subtract(1, 'month').endOf('day') }
        }
      }
    }
  );

  return Promise
    .all([totalRevenues, currentMonthRevenues, previousMonthRevenues])
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