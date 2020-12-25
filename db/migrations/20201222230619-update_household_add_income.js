"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Households", "income", {
      type: Sequelize.DOUBLE,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Households", "income");
  },
};
