const models = require("../models/index.js");

const getHouseholdByUserId = async (userId) =>
  await models.HouseholdMember.findOne({
    where: { userId: userId },
  });

const getHouseholdById = async (householdId) =>
  await models.Household.findOne({
    where: { id: householdId },
  });

const addHousehold = async (household) => {
  try {
    const userAlreadyHasHousehold = await models.HouseholdMember.findOne({
      where: { userId: household.userId },
    });
    if (!userAlreadyHasHousehold) {
      try {
        const newHousehold = await models.Household.create({
          name: household.name,
        });
        models.HouseholdMember.create({
          householdId: newHousehold.id,
          userId: household.userId,
        });

        return "New household added for user";
      } catch (err) {
        return `An error occurred: ${err}`;
      }
    } else return "This user already belongs to a household";
  } catch (err) {
    return err.toString();
  }
};
module.exports = {
  addHousehold,
  getHouseholdByUserId,
  getHouseholdById,
};
