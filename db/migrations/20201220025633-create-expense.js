"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Expenses", {
      amount: Sequelize.DataTypes.DOUBLE,
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
      householdId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Households",
          },
          key: "id",
        },
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Expenses");
  },
};
