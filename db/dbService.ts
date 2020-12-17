const { Sequelize, Model, DataTypes } = require('sequelize');
console.log( process.env.DB_CONNECTION_HOST);
const dataBase = new Sequelize({
    database: process.env.DB_CONNECTION_DATABASE,
    username:  process.env.DB_CONNECTION_USERNAME,
    password:  process.env.DB_CONNECTION_PASSWORD,
    host:  process.env.DB_CONNECTION_HOST,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
  });

const pingDb = async () => {
    try {
        await dataBase.authenticate(); 
        return "DB Auth successful";
    }
    catch(err) {
        return `DB Auth failed: ${err.toString()}`;
    }
}


export {
    pingDb
}