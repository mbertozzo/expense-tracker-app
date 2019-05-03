const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (db) => {
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
}