const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const masterDbServer = sequelize.define("master_db_servers",
    {
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 250,
            defaultValue: null
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 250,
            defaultValue: null 
        },
        db_name: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 250,
            defaultValue: null
        },
        user: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 150,
            defaultValue: null
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        },
        port: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 45,
            defaultValue: null
        }
    },
    {
        timestamps: true
    });