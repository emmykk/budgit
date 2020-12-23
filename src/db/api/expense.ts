const addExpense = async (
  expenseData: Expense
): Promise<DbResponse<Expense>> => {
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

const getAllExpenses = async (userId: Number): Promise<DbResponse<Expense>> => {
  //  find household by userId in HouseholdMember table
  const usersHousehold = await models.HouseholdMember.findOne({
    where: { userId: userId },
  });
  const { householdId } = usersHousehold;

  try {
    const allExpenses = await models.Expense.findAll({
      where: { HouseholdId: householdId },
    });
    return { message: null, body: allExpenses };
  } catch (err) {
    return { message: err.toString(), body: null };
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};
