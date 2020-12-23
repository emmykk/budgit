var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Sequelize, DataTypes } = require("sequelize");
const { dbCredsForSequelize } = require("./../config/config");
const models = require("../models/index");
const dataBase = new Sequelize(dbCredsForSequelize);
// Test in place to ensure dbCreds are correct
const connectToDb = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield dataBase.authenticate();
        return "DB Auth successful";
    }
    catch (err) {
        return `DB Auth failed: ${err.toString()}`;
    }
});
const insertUser = ({ username, email, password }) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (username && email && password) {
            return yield models.User.create({
                username,
                email,
                password,
            });
        }
        else {
            return "Improper formatting";
        }
    }
    catch (err) {
        return `Failed to insert user: ${err.toString()}`;
    }
});
const getUserById = (userId, callback = null) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield models.User.findOne({
            where: { id: userId },
        });
        if (!callback) {
            return result;
        }
        return result
            ? callback(result)
            : callback(null, "An error occurred fetching the result");
    }
    catch (err) {
        return callback(null, `${err.toString()}`);
    }
});
const getUserByUsername = (username) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield models.User.findOne({
            where: { username: username },
        });
        return result
            ? new Promise((resolve) => resolve({ body: result }))
            : new Promise((resolve) => resolve({ error: "This username does not exist." }));
    }
    catch (err) {
        return new Promise((resolve) => ({
            error: `Failure to retrieve user: ${err.toString()}`,
        }));
    }
});
const getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield models.User.findAll();
        return users;
    }
    catch (err) {
        return `Failed to retreive users: ${err.toString()}`;
    }
});
const cleanUpTestData = () => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield models.User.destroy({ where: { email: "test@test.com" } });
    }
    catch (err) {
        return `Failed to clean users: ${err.toString()}`;
    }
});
// Test helper method
const disconnect = () => dataBase.close();
module.exports = {
    connectToDb,
    insertUser,
    getUserById,
    getUserByUsername,
    getAllUsers,
    cleanUpTestData,
    disconnect,
};
