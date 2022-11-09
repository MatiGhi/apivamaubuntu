const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize');

const passwordReset = sequelize.define("password_resets",
    {
        token: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 500,
            defaultValue: null
        }
    },
    {
        timestamps: true
    });