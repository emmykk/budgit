const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelizeCredentials } = require('./config/config.ts');

const models = require("./models");
const dataBase = new Sequelize(sequelizeCredentials);

const pingDb = async () => {
  try {
    await dataBase.authenticate();
    return "DB Auth successful";
  } catch (err) {
    return `DB Auth failed: ${err.toString()}`;
  }
};

const insertUser = async (username, email, password) => {
  try {
    return await models.User.create({
      username: username,
      email: email,
      password: password,
    });
  } catch (err) {
    return `Failed to retreive users: ${err.toString()}`;
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

export { pingDb, getAllUsers, insertUser, cleanUpTestData };
