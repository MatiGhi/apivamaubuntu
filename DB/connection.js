const { Sequelize } = require("sequelize");

let { DB_CONF_ADMIN } = require("../config/config_env");
let sequelize = new Sequelize(DB_CONF_ADMIN);

let dbConnection= async () => {
    try {
        await sequelize.authenticate();
        console.log('Succesfully connection to Database! 🚀');

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    sequelize,
    dbConnection
}