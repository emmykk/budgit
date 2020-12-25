"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("Categories", [
      {
        name: "food & groceries",
      },
      {
        name: "entertainment",
      },
      {
        name: "miscellaneous",
      },
      {
        name: "housing",
      },
      {
        name: "utilities",
      },
      {
        name: "transportation",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
