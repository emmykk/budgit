const addHousehold = async (
  household: Household
): Promise<DbResponse<Household>> => {
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

        return {
          message: "New household added for user",
          body: newHousehold,
        };
      } catch (err) {
        return { message: `An error occurred: ${err}`, body: null };
      }
    } else
      return {
        message: "This user already belongs to a household",
        body: null,
      };
  } catch (err) {
    return { message: err.toString(), body: null };
  }
};
module.exports = {
  addHousehold,
};
