"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("HouseholdMembers", {
      userId: Sequelize.UUID,
      householdId: Sequelize.UUID,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("HouseholdMembers");
  },
};
