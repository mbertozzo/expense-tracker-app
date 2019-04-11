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