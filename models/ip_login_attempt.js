const { sequelize } = require("../DB/connection");
const { DataTypes } = require('sequelize'); 

const ipLoginAttempt = sequelize.define("ip_login_attempts",
    {
        ip: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 45,
            defaultValue: null
        },
        user_type: {
            type: DataTypes.ENUM(["user","admin"]),
            //type: DataTypes.STRING,
            allowNull: true,
            max: 45,
            defaultValue: null
        }
    },
    {
        timestamps: true
    });