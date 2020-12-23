const { Sequelize, DataTypes } = require("sequelize");
const { dbCredsForSequelize } = require("./../config/config");
const models = require("../models/index");
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

const insertUser = async ({
  username,
  email,
  password,
}: User): Promise<DbResponse<User>> => {
  try {
    if (username && email && password) {
      const newUser = await models.User.create({
        username,
        email,
        password,
      });
      return { message: "New user created", body: newUser };
    } else {
      return { message: "Improper formatting", body: null };
    }
  } catch (err) {
    return { message: `Failed to insert user: ${err.toString()}`, body: null };
  }
};

const getUserById = async (userId: Number): Promise<DbResponse<User>> => {
  try {
    const result = await models.User.findOne({
      where: { id: userId },
    });
    if (result) {
      return { message: "fetched user", body: result };
    }
    return { message: "An error occurred fetching the result", body: null };
  } catch (err) {
    return { message: `${err.toString()}`, body: null };
  }
};

const getUserByUsername = async (
  username: String
): Promise<DbResponse<User>> => {
  try {
    const result = await models.User.findOne({
      where: { username: username },
    });
    return result
      ? { message: "User retreived", body: result }
      : { message: "This username does not exist.", body: null };
  } catch (err) {
    return {
      message: `Failure to retrieve user: ${err.toString()}`,
      body: null,
    };
  }
};

const getAllUsers = async (): Promise<DbResponse<User[]>> => {
  try {
    const users = await models.User.findAll();
    return { message: "Retreived users", body: users };
  } catch (err) {
    return {
      message: `Failed to retreive users: ${err.toString()}`,
      body: null,
    };
  }
};

const cleanUpTestData = async (): Promise<DbResponse<Number>> => {
  try {
    return {
      message: "User deleted",
      body: await models.User.destroy({ where: { email: "test@test.com" } }),
    };
  } catch (err) {
    return { message: `Failed to clean users: ${err.toString()}`, body: null };
  }
};

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
