"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Expenses", "CategoryId", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Categories",
        },
        key: "id",
      },
      allowNull: false,
      defaultValue: 3, // Default Value = Miscellaneous, id 3
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Expenses, CategoryId");
  },
};
