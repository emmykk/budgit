const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.ENUM(
          "food & groceries",
          "entertainment",
          "miscellaneous",
          "housing",
          "utilities",
          "transportation"
        ),
      },
    },
    {
      timestamps: false,
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Expense);
  };

  return Category;
};
