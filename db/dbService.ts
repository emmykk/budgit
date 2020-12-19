const { Sequelize, Model, DataTypes } = require("sequelize");
const { dbCredsForSequelize } = require("./config/config.ts");

const models = require("./models");
const dataBase = new Sequelize(dbCredsForSequelize);

const connectToDb = async () => {
  try {
    await dataBase.authenticate();
    return "DB Auth successful";
  } catch (err) {
    return `DB Auth failed: ${err.toString()}`;
  }
};

const insertUser = async ({ username, email, password }) => {
  try {
    if (username && email && password) {
      return await models.User.create({
        username,
        email,
        password,
      });
    } else {
      return "Improper formatting";
    }
  } catch (err) {
    return `Failed to insert user: ${err.toString()}`;
  }
};

const getUserByUsername = async (username, callback) => {
  try {
    const result = await models.User.findOne({
      where: { username: username },
    });

    return result
      ? callback(result)
      : callback(null, "An error occurred fetching the result");
  } catch (err) {
    return callback(null, `Failed to clean users: ${err.toString()}`);
  }
};

const getAllUsers = async () => {
  try {
    const users = await models.User.findAll();
    return users;
  } catch (err) {
    return `Failed to retreive users: ${err.toString()}`;
  }
};

const cleanUpTestData = async () => {
  try {
    return await models.User.destroy({ where: { email: "test@test.com" } });
  } catch (err) {
    return `Failed to clean users: ${err.toString()}`;
  }
};

const disconnect = () => dataBase.close();

module.exports = {
  connectToDb,
  getAllUsers,
  insertUser,
  cleanUpTestData,
  disconnect,
  getUserByUsername,
};
