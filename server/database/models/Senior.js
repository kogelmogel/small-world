const {connector, Sequelize} = require("../config/dbConfig");

const Senior = connector.define("senior", {
    name: Sequelize.STRING,
    lastName: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    city: Sequelize.STRING,
    age: Sequelize.INTEGER,
});

module.exports = Senior;