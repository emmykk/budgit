const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Household = sequelize.define(
    "Household",
    {
      name: DataTypes.STRING,
      income: DataTypes.DOUBLE,
    },
    {
      timestamps: false,
    }
  );

  Household.associate = (models) => {
    Household.belongsToMany(models.User, { through: "HouseholdMembers" });
    Household.hasMany(models.Expense);
  };

  return Household;
};
