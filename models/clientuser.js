const { sequelize } = require("../DB/connection");
const { DataTypes } = require ('sequelize');

const clientUser = sequelize.define("clientsusers",
    {
        id:{
            primaryKey: true,
            autoIncrement:true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING,
            allownull: false,
            max: 250,
            defaultValue:''
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 191
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 191,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            max: 191
        },
        remember_token: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 191,
            defaultValue: null
        },
        client_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        locked_last_attempt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        attempts:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        freezeTableName: true,
        timestamps: true
    });

module.exports = {
    clientUser
};