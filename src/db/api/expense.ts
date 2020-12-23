// const models = require("../models/index.js");
// const {ExpenseData } = require("../../types/expenseTypes");
type ExpenseData = {
  HouseholdId: Number;
  UserId: Number;
  description: string;
  amount: Number;
};

const addExpense = async (expenseData: ExpenseData) => {
  try {
    const newExpense = await models.Expense.create({
      ...expenseData,
    });
    return {
      message: `New expense of $${expenseData.amount} added to the householdId ${expenseData.HouseholdId}`,
      body: newExpense,
    };
  } catch (err) {
    return { message: err.toString(), body: null };
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
