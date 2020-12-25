"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Expenses", "description", {
      allowNull: false,
      type: Sequelize.TEXT,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Expenses, description");
  },
};
