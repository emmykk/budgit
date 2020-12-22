const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const HouseholdMember = sequelize.define(
    "HouseholdMember",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: false,
      },
      householdId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return HouseholdMember;
};
