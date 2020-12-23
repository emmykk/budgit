"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });
    User.associate = (models) => {
        User.belongsTo(models.Household, { through: "HouseholdMembers" });
    };
    return User;
};
