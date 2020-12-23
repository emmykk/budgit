module.exports = {
    dbCredsForSequelize: {
        database: process.env.DB_CONNECTION_DATABASE,
        username: process.env.DB_CONNECTION_USERNAME,
        password: process.env.DB_CONNECTION_PASSWORD,
        host: process.env.DB_CONNECTION_HOST,
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
