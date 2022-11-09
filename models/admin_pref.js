const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const admin_pref = sequelize.define("admin_prefs",{
    general_prefs: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});