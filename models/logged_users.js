const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const loggedUser = sequelize.define("logged_users",
    {
        id: {
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null
        }
    },{
        freezeTableName: true,
        timestamps: true
    });

module.exports = {
    loggedUser
}