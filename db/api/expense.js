const models = require("../models/index.js");

const addExpense = async (expenseData) => {
  /**
   * @param expenseData structure:
   * object with properties:
   * HouseholdId
   * UserId
   * description
   * amount
   *  */
  try {
    const newExpense = await models.Expense.create({
      ...expenseData,
    });
    return {
      message: `New expense of $${expenseData.amount} added to the householdId ${expenseData.HouseholdId}`,
      body: newExpense,
    };
  } catch (err) {
    return { error: err.toString() };
  }
};

const getAllExpenses = async (userId) => {
  //  find household by userId in HouseholdMember table
  const usersHousehold = await models.HouseholdMember.findOne({
    where: { userId: userId },
  });
  const { householdId } = usersHousehold;

  try {
    const allExpenses = await models.Expense.findAll({
      where: { HouseholdId: householdId },
    });
    return { body: allExpenses, message: null };
  } catch (err) {
    return { message: err.toString(), body: null };
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};
