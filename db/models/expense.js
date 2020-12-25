const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "Expense",
    {
      amount: DataTypes.DOUBLE,
      createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Expense.associate = (models) => {
    Expense.belongsTo(models.User, {
      foreignKey: {
        name: "UserId",
        allowNull: false,
      },
    });
    Expense.belongsTo(models.Household, {
      foreignKey: {
        name: "HouseholdId",
        allowNull: false,
      },
    });
    Expense.belongsTo(models.Category, {
      foreignKey: {
        name: "CategoryId",
        allowNull: false,
      },
    });
  };

  return Expense;
};
