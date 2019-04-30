var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Movement = sequelize.define('movement', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description: DataTypes.STRING,
      amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      issue_date: {
        type: DataTypes.DATE,
        get: function() {
          // return moment(this.getDataValue("date")).format("MM/DD/YYYY");
          return moment.utc(this.getDataValue("issue_date")).format();
        }
      },
    },
    {
      freezeTableName: true,
    }
  );

  Movement.associate = (models) => {
    Movement.belongsTo(models.category);
  };

  return Movement;
}