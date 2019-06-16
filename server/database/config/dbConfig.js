require('dotenv').config();
const Sequelize = require("sequelize");

//Configure DB
const connector = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres"
    }
);

connector
    .authenticate()
    .then(() => console.log(`Authentification to ${process.env.DB_NAME} was successful!`))
    .catch(error => console.error(`Couldn't authenticate connection to ${process.env.DB_NAME}`));


module.exports = {
    Sequelize,
    connector
}