module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.movement);
  };

  return Category;
}