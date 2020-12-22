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
    Expense.belongsTo(models.User);
    Expense.belongsTo(models.Household);
  };

  return Expense;
};
