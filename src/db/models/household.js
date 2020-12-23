module.exports = (sequelize, DataTypes) => {
  const Household = sequelize.define(
    "Household",
    {
      name: DataTypes.STRING,
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
