const models = require("../models/index.js");

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

        return new Promise((resolve) =>
          resolve("New household added for user")
        );
      } catch (err) {
        return new Promise((done) => done(`An error occurred: ${err}`));
      }
    } else
      return new Promise((resolve) =>
        resolve("This user already belongs to a household")
      );
  } catch (err) {
    return new Promise((done) => done(err.toString()));
  }
};
module.exports = {
  addHousehold,
};
