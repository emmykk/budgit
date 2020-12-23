var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const models = require("../models/index.js");
const addHousehold = (household) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userAlreadyHasHousehold = yield models.HouseholdMember.findOne({
            where: { userId: household.userId },
        });
        if (!userAlreadyHasHousehold) {
            try {
                const newHousehold = yield models.Household.create({
                    name: household.name,
                });
                models.HouseholdMember.create({
                    householdId: newHousehold.id,
                    userId: household.userId,
                });
                return "New household added for user";
            }
            catch (err) {
                return `An error occurred: ${err}`;
            }
        }
        else
            return "This user already belongs to a household";
    }
    catch (err) {
        return err.toString();
    }
});
module.exports = {
    addHousehold,
};
