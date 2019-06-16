const {connector, Sequelize} = require("../config/dbConfig");
const Senior = require("../models/Senior");

const Interest = connector.define("interest", {
    hobby: Sequelize.STRING,
});

Senior.hasMany(Interest);
Interest.belongsTo(Senior);

module.exports = Interest;