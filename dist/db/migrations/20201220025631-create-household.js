"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Households", {
            name: Sequelize.DataTypes.STRING,
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Households");
    },
};
