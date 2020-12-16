const { Sequelize, Model, DataTypes } = require('sequelize');
// const dataBase = new Sequelize(process.env.DB_CONNECTION_STRING);
const dataBase = new Sequelize({
    database: "d3e08p4h1e5jgg",
    username: "frrlztwmmfnqfv",
    password: "5b11507adb3f8becbaa9be4d59d91f25408e04b70e5b3455ba94bd84f10e0e92",
    dialect: "postgres",
    options: {
        port: 5432,
        host: "ec2-54-204-96-190.compute-1.amazonaws.com",
    password: "5b11507adb3f8becbaa9be4d59d91f25408e04b70e5b3455ba94bd84f10e0e92",
    database: "d3e08p4h1e5jgg",
    username: "frrlztwmmfnqfv"

    },
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    }
});

const pingDb = async () => {
    try {
        console.log(process.env.DB_CONNECTION_STRING);
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