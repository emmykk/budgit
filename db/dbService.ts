const { Sequelize, DataTypes } = require("sequelize");
const { dbCredsForSequelize } = require("./config/config.ts");
const models = require("./models");
const dataBase = new Sequelize(dbCredsForSequelize);

// Test in place to ensure dbCreds are correct
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
      return "Improper formatting - missing email, username, or password";
    }
  } catch (err) {
    return `Failed to insert user: ${err.toString()}`;
  }
};

const getUserById = async (userId, callback = null) => {
  try {
    const result = await models.User.findOne({
      where: { id: userId },
    });
    if (!callback) {
      return result;
    }
    return result
      ? callback(result)
      : callback(null, "An error occurred fetching the result");
  } catch (err) {
    return callback(null, `${err.toString()}`);
  }
};

const getUserByUsername = async (username) => {
  try {
    const result = await models.User.findOne({
      where: { username: username },
    });
    return result
      ? { body: result }
      : { error: "This username does not exist." };
  } catch (err) {
    return new Promise((resolve) => ({
      error: `Failure to retrieve user: ${err.toString()}`,
    }));
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

// Test helper method
const disconnect = () => dataBase.close();

module.exports = {
  dataBase,
  connectToDb,
  getAllUsers,
  insertUser,
  cleanUpTestData,
  disconnect,
  getUserByUsername,
  getUserById,
};
