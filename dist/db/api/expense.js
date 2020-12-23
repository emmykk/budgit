var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const addExpense = (expenseData) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newExpense = yield models.Expense.create(Object.assign({}, expenseData));
        return {
            message: `New expense of $${expenseData.amount} added to the householdId ${expenseData.HouseholdId}`,
            body: newExpense,
        };
    }
    catch (err) {
        return { message: err.toString(), body: null };
    }
});
const getAllExpenses = (userId) => __awaiter(this, void 0, void 0, function* () {
    //  find household by userId in HouseholdMember table
    const usersHousehold = yield models.HouseholdMember.findOne({
        where: { userId: userId },
    });
    const { householdId } = usersHousehold;
    try {
        const allExpenses = yield models.Expense.findAll({
            where: { HouseholdId: householdId },
        });
        return { body: allExpenses, message: null };
    }
    catch (err) {
        return { message: err.toString(), body: null };
    }
});
module.exports = {
    addExpense,
    getAllExpenses,
};
